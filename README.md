Mitrais Coding Test

Requirement

1. Python 3.8++
2. npm
3. postgresql v10++

How to install

1. setup your virtual environment with above requirement
2. install dependency from requirements.txt
	```$ pip install -r requirements.txt```
3. install npm dependency
	```$ npm install```
4. run watch
	```$ npm run watch```
5. setup config for database credential and path dir
	```
	ENGINE = 'django.db.backends.postgresql'
	DB = '{{your_db_here}}'
	USER = '{{username}}'
	PASS = '{{password}}'
	HOST = '{{host}}'

	STATIC_URL = '/static/'
	MEDIA_URL = '/media/'
	ASSET_URL = ''

	DEBUG = True
	```
6. migrate model
	``` $ python manage.py makemigrations```
	``` $ python manage.py migrate```

7. run
	``` $ python manage.py runserver```
