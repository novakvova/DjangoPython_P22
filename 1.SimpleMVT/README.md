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

## Clone Project
```
.venv\Scripts\activate.bat
pip freeze
pip freeze > requirements.txt

git clone https://github.com/novakvova/DjangoPython_P22
cd DjangoPython_P22
cd 1.SimpleMVT
py -m venv .venv
.venv\Scripts\activate.bat

python.exe -m pip install --upgrade pip
#py -m pip install Django
pip install -r requirements.txt
cd djangomvt
py manage.py runserver 4892
```