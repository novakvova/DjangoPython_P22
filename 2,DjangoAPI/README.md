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
