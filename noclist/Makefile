server: main.go
	go build -o server main.go
	chmod a+x ./server

.PHONY: clean
clean:
	rm -f server noclist

.PHONY: docker
docker: clean
	docker build . -t adhocteam/noclist

.PHONY: docker-push
docker-push: docker
	docker push adhocteam/noclist:latest

.PHONY: run-docker
run-docker:
	docker run --rm -p 8888:8888 adhocteam/noclist

noclist: noclist.go
	go install noclist.go
