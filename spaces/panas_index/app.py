import gradio as gr
import requests
import os

BACKEND=os.getenv("PANAS_BACKEND_URL","https://panas-rea-backend-2079d92d655a.herokuapp.com")

def fetch_index():
    try:
        r=requests.get(f"{BACKEND}/metrics/index", timeout=10)
        r.raise_for_status()
        data=r.json()
        return data
    except Exception as e:
        return {"error": str(e)}

demo = gr.Interface(
    fn=lambda: fetch_index(),
    inputs=None,
    outputs=gr.JSON(),
    title="PANAS Index & REA Explorer",
    description=f"Backend: {BACKEND}"
)

if __name__ == "__main__":
    demo.launch()
