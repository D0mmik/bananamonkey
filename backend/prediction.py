from PIL import Image
from io import BytesIO
import numpy as np
import tensorflow as tf

input_shape = (256, 256)


def load_model():
    return tf.keras.models.load_model('model.h5')


_model = load_model()


def read_image(image_encoded):
    pil_image = Image.open(BytesIO(image_encoded))
    return pil_image


def preprocess_image(image: Image.Image):
    image = image.resize(input_shape)
    image = np.asarray(image)
    image = np.expand_dims(image / 255, 0)

    return image


def predict_image(image: np.ndarray):
    return _model.predict(image)
