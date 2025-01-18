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
    allow_origins=origins,  # Allow requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)


@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):

    image_bytes = await file.read()
    image_array = preprocess_image(BytesIO(image_bytes))
    prediction = predict_image(image_array)

    return {"prediction": round(float(prediction), 4)}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
