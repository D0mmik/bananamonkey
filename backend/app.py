from anyio.streams import file
from fastapi import FastAPI
from fastapi import UploadFile, File
import uvicorn

from backend.prediction import read_image, preprocess_image, predict_image

app = FastAPI()


@app.get("/index")
def hello_world():
    return {"Hello": "World"}


@app.post("/api/predict")
def predict(file: UploadFile = File(...)):
    image = read_image(file)
    image = preprocess_image(image)
    return predict_image(image)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
