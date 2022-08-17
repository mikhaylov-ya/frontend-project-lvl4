start-frontend:
	make -C frontend start

start-backend:
	npx start-server -a localhost -p 5001 -s ./frontend/build

start:
	make start-backend & make start-frontend

deploy:
	git push heroku main

build-frontend:
	cd frontend
	DISABLE_ESLINT_PLUGIN=true npm run build

lint:
	npx eslint frontend/src

restart:
	make build-frontend
	make start
