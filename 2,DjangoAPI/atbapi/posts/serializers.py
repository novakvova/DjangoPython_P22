from rest_framework import serializers
from .models import Post
from topics.models import Topic
from users.models import CustomUser


class PostSerializer(serializers.ModelSerializer):
    user_name = serializers.StringRelatedField(source='user.first_name', read_only=True)  # або можна зробити вкладений серіалізатор
    topic_name = serializers.StringRelatedField(source='topic.name', read_only=True)

    # has_media = serializers.SerializerMethodField()

    image = serializers.ImageField(required=False, allow_null=True)
    video = serializers.FileField(required=False, allow_null=True)

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'body',
            'image',
            'video',
            'video_url',
            'created_at',
            'user',
            'user_name',
            'topic',
            'topic_name',
            # 'has_media',
        ]

    # def get_has_media(self, obj):
    #     return obj.has_media()
