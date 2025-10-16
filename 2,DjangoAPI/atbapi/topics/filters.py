import django_filters
from .models import Topic

class TopicFilter(django_filters.FilterSet):
    parent = django_filters.ModelChoiceFilter(
        queryset=Topic.objects.all(),
        null_label='(No parent)',
        method='filter_parent',
    )

    def filter_parent(self, queryset, name, value):
        if self.data.get('parent') == 'null':
            return queryset.filter(parent__isnull=True)
        return queryset.filter(parent=value)

    class Meta:
        model = Topic
        fields = ['parent']