from PIL import Image
from io import BytesIO
import numpy as np
import tensorflow as tf

input_shape = (256, 256)


def load_model():
    return tf.keras.models.load_model('bananamonkey.h5')


_model = load_model()


def read_image(image_encoded):
    pil_image = Image.open(BytesIO(image_encoded))
    return pil_image


def preprocess_image(image_bytes: BytesIO):

    image = Image.open(image_bytes).resize((256, 256))

    image_array = np.array(image) / 255.0

    image_array = np.expand_dims(image_array, axis=0)
    
    return image_array


def predict_image(image_array):
    return _model.predict(image_array)
