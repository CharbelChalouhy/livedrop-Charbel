import requests
import time

API_URL = "http://localhost:5000/chat"  # Replace with your public ngrok URL if applicable

def ask_question(question):
    try:
        response = requests.post(API_URL, json={"question": question})
        if response.status_code == 200:
            return response.json().get("answer", "No answer returned.")
        else:
            return f"Error: {response.status_code} - {response.text}"
    except Exception as e:
        return f"Request failed: {e}"

def main():
    print("🧠 ShopLite RAG Assistant")
    print("Type 'exit' to quit.\n")

    log = []

    while True:
        q = input("You > ")
        if q.lower() in ("exit", "quit"):
            break

        start = time.time()
        answer = ask_question(q)
        end = time.time()

        print(f"\nAssistant > {answer.strip()}")
        print(f"⏱ Response time: {round(end - start, 2)}s\n")

        log.append({"question": q, "answer": answer})

    print("\nSession log:")
    for entry in log:
        print(f"- Q: {entry['question']}")
        print(f"  A: {entry['answer'][:80]}...\n")

if __name__ == "__main__":
    main()