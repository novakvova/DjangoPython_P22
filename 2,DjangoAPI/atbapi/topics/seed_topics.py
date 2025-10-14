from slugify import slugify
from .models import Topic

def run():
    topics = [
        {
            "name": "Інтернет-культура (тренди)",
            "description": "Теми, пов’язані з інтернет-мемами, трендами та соцмережами.",
            "children": [
                {"name": "Меми"},
                {"name": "Соцмережі"},
                {"name": "Стрімінг"},
            ],
        },
        {
            "name": "Ігри",
            "description": "Усе про комп’ютерні, консольні та мобільні ігри.",
            "children": [
                {"name": "Комп’ютерні ігри"},
                {"name": "Консольні ігри"},
                {"name": "Мобільні ігри"},
            ],
        },
        {
            "name": "Запитання та відповіді",
            "description": "Обговорення, поради, відповіді на запитання.",
            "children": [
                {"name": "AskReddit"},
                {"name": "Explain Like I'm Five"},
            ],
        },
        {
            "name": "Технології",
            "description": "Гаджети, програмування, штучний інтелект та інше.",
            "children": [
                {"name": "Гаджети"},
                {"name": "Програмування"},
                {"name": "AI"},
            ],
        },
        {
            "name": "Поп-культура",
            "description": "Музика, фільми, серіали, знаменитості.",
            "children": [
                {"name": "Музика"},
                {"name": "Серіали"},
                {"name": "Кіно"},
            ],
        },
        {
            "name": "Кіно й ТБ",
            "description": "Останні новини кіноіндустрії, рецензії та обговорення.",
            "children": [
                {"name": "Новини кіно"},
                {"name": "Обговорення фільмів"},
            ],
        },
    ]
    parentIndex = 1
    for t in topics:
        # print("Topic", t)
        parent, _ = Topic.objects.get_or_create(
            name=t["name"],
            url_slug=slugify(t["name"]),
            description = t["description"],
            priority = parentIndex
        )

        childrenIndex=1
        for child_data in t.get("children", []):
            Topic.objects.get_or_create(
                name=child_data["name"],
                url_slug=slugify(child_data["name"]),
                parent=parent,
                priority = childrenIndex
            )
            childrenIndex = childrenIndex+1

        parentIndex = parentIndex+1
        


    print("✅ Topics seeded successfully!")
