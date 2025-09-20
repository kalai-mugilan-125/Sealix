import cv2
import numpy as np
from tensorflow.keras.models import load_model

class ForgeryDetector:
    def __init__(self, model_path='./weights/forgery_model.h5'):
        self.model = load_model(model_path)
    
    def preprocess_image(self, image_path):
        img = cv2.imread(image_path)
        img = cv2.resize(img, (224, 224))
        img = img / 255.0
        return np.expand_dims(img, axis=0)
    
    def detect_forgery(self, image_path):
        try:
            processed_image = self.preprocess_image(image_path)
            prediction = self.model.predict(processed_image)
            
            return {
                'is_forged': bool(prediction[0] > 0.5),
                'confidence': float(prediction[0])
            }
        except Exception as e:
            raise Exception(f"Forgery detection failed: {str(e)}")