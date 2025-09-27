import uuid
from io import BytesIO
from django.core.files.base import ContentFile
from PIL import Image
from django.db import models
from django.utils.text import slugify
from unidecode import unidecode


# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=255, null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        if self.image:
            # Якщо вже є фото (старе), видаляємо перед збереженням нового
            # print("Save salf.pk", self.pk)
            if self.pk:  # об'єкт уже існує
                old = type(self).objects.filter(pk=self.pk).first()
                if old and old.image and old.image != self.image:
                    old.image.delete(save=False)

            img = Image.open(self.image)

            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            filename = f"{uuid.uuid4().hex}.webp"

            buffer = BytesIO()
            img.save(buffer, format='WEBP')
            buffer.seek(0)

            self.image.save(filename, ContentFile(buffer.read()), save=False)

        if not self.slug:
            base_slug = slugify(unidecode(self.name))
            slug = base_slug
            counter = 1
            while Category.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug

        super().save(*args, **kwargs)

    # String representation of the model
    def __str__(self):
        return self.name