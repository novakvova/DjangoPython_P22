from PIL import Image
import io
import uuid
from django.core.files.base import ContentFile
import requests 
from django.conf import settings

def compress_image(image_field, size=(800,800), quality=85):
    # Open the image
    # Convert to RGB if it's a PNG - якщо зображення PNG, перетворити на RGB
    image = Image.open(image_field).convert('RGB')

    # Зберігаємо оригінальне зображення його пропорції aspect ratio
    image.thumbnail(size, Image.LANCZOS)

    # робимо ім'я нового зображення
    uid = str(uuid.uuid4())[:10]
    image_name=f'{uid}.webp'

    # зберігаємо зображення в пам'яті
    output = io.BytesIO()

    image.save(output, format='WEBP', quality=quality)

    output.seek(0)

    # зберігаємо зображення в моделі
    optimized_image = ContentFile(output.getvalue())

    # повертаємо оптимізоване зображення та ім'я файлу
    return optimized_image, image_name

def verify_recaptcha(token):
    secret_key = settings.RECAPTCHA_SECRET_KEY
    url = "https://www.google.com/recaptcha/api/siteverify"
    payload = {
        "secret": secret_key,
        "response": token
    }
    response = requests.post(url, data=payload)
    result = response.json()

    print(result)

    return result