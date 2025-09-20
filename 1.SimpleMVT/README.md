# Simple MVT
```
py --version
py -m venv .venv
```

## Activate venv
```
.venv\Scripts\activate.bat
python.exe -m pip install --upgrade pip
py -m pip install Django
py

>>>import django
>>>print(django.get_version())
>>>quit()

python -m django --version
mkdir djangomvt
django-admin startproject mysite djangomvt
cd djangomvt
py manage.py runserver 9581

py manage.py startapp categories
py manage.py migrate

py manage.py startapp users

deactivate
```