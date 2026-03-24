from langchain_huggingface import ChatHuggingFace, HuggingFaceEndpoint, HuggingFaceEndpointEmbeddings
from langchain_text_splitters.character import RecursiveCharacterTextSplitter
from dotenv import load_dotenv

load_dotenv()

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
    separators=["\n\n", "\n", ".", "!", "?", " ", ""],
)

embeddings = HuggingFaceEndpointEmbeddings(
    model="sentence-transformers/all-MiniLM-L6-v2",
    task="feature-extraction"
) 

llm = HuggingFaceEndpoint(
    repo_id="deepseek-ai/DeepSeek-R1-0528",
    task="text-generation",
    max_new_tokens=2048,
    do_sample=False,
    repetition_penalty=1.03,
    provider="auto"
)

chat_model = ChatHuggingFace(llm=llm)

def explain_prediction(symbol, signal, prediction, evaluation):
    prompt = f"""
    You are an AI financial analyst.

    Analyze the following stock prediction:

    Symbol: {symbol}
    Trading Signal: {signal}
    Predicted Next Price: {prediction}
    Model Evaluation:
    - MAE: {evaluation['mae']}
    - MSE: {evaluation['mse']}
    - RMSE: {evaluation['rmse']}
    - R2 Score: {evaluation['r2']}

    Tasks:
    1. Explain why the model might have given this trading signal.
    2. Interpret the prediction in simple terms (is the price expected to rise or fall?).
    3. Evaluate the reliability of the model using the metrics.
    4. Mention any risks or uncertainty.

    Keep the explanation clear, concise, and easy to understand.
    """

    response = chat_model.invoke(prompt)
    return response