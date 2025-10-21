from django.db import models

from topics.models import Topic
from users.models import CustomUser

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField(blank=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # Зв’язки
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='posts')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title

    # def has_media(self):
    #     return self.image or self.video or self.video_url

