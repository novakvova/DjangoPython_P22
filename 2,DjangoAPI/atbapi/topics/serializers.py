from rest_framework import serializers
from .models import Topic

class TopicSerializer(serializers.ModelSerializer):
    # 👇 Для вкладених дочірніх елементів (children)
    children = serializers.SerializerMethodField()
    parent_name = serializers.CharField(source='parent.name', read_only=True)

    class Meta:
        model = Topic
        fields = [
            'id',
            'name',
            'url_slug',
            'priority',
            'image',
            'description',
            'parent',
            'parent_name',
            'children',
        ]

    def get_children(self, obj):
        """Повертає список дочірніх тем"""
        children = obj.children.all().order_by('priority', 'name')
        return TopicChildSerializer(children, many=True).data


class TopicChildSerializer(serializers.ModelSerializer):
    """Серіалізатор для вкладених children"""
    class Meta:
        model = Topic
        fields = ['id', 'name', 'url_slug', 'priority']
