from django.db import models

# Create your models here.

class Topic(models.Model):
    name = models.CharField(max_length=200, blank=False)
    url_slug = models.SlugField(max_length=255, unique=True)
    priority = models.IntegerField(default=0)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    description = models.TextField(max_length=4000, null=True, blank=True)

    parent = models.ForeignKey(
        'self',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='children'
    )

    class Meta:
        db_table = 'tblTopics'
        ordering = ['priority', 'name']

    def __str__(self):
        return self.name