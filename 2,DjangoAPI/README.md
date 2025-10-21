# Simple REST API
```
py --version
py -m venv .venv
```

## Activate venv
```
.venv\Scripts\activate.bat
python.exe -m pip install --upgrade pip
py -m pip install django

pip freeze > requirements.txt

python -m django --version

django-admin startproject atbapi

cd atbapi

py manage.py runserver 4099

```

## Install Postgres
```
pip install psycopg2-binary
py manage.py migrate
```

## Add CustomUser
```
py manage.py startapp users

pip install -r requirements.txt

py manage.py makemigrations users
py manage.py migrate

py manage.py runserver 4099
```

## Working TOPIC - reddit.com
```
py manage.py startapp topics

py manage.py makemigrations topics

py manage.py migrate

python manage.py shell

from topics.seed_topics import run
run()

exit()


py manage.py runserver 4099
```
## Filtes data

```
pip install django-filter

```

## Working Posts
```
py manage.py startapp posts

py manage.py makemigrations posts
```
