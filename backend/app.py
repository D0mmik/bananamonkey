from fastapi import FastAPI
from fastapi import UploadFile, File
import uvicorn
from io import BytesIO

from prediction import predict_image, preprocess_image

app = FastAPI()

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):

    image_bytes = await file.read()
    image_array = preprocess_image(BytesIO(image_bytes))
    prediction = predict_image(image_array)

    return {"prediction": round(float(prediction), 4)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
