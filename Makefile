test:
	docker build ./Dockerfile.prod -t prod-server-img

prod-server:
	docker rm -f prod-client-container || \ 
	docker build -f Dockerfile.prod -t prod-server-img . && docker run --name prod-client-container -d -p 80:80 --restart always prod-server-img
