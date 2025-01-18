from fastapi import FastAPI
from fastapi import UploadFile, File
import uvicorn
from io import BytesIO
from fastapi.middleware.cors import CORSMiddleware

from prediction import predict_image, preprocess_image

app = FastAPI()
origins = [
    "http://localhost:5173",
    "https://bananamonkey.vercel.app/"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/predict")
async def predict(file: UploadFile):

    data = await file.read()
    image_array = preprocess_image(BytesIO(data))
    prediction = predict_image(image_array)

    return {"prediction": round(float(prediction), 4)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
