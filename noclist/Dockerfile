FROM golang:1.9-alpine as builder
RUN apk add --update --no-cache build-base
RUN mkdir -p /go/src/github.com/adhocteam/homework
COPY . /go/src/github.com/adhocteam/homework
WORKDIR /go/src/github.com/adhocteam/homework
ENV CGO_ENABLED=0
RUN make server

FROM alpine:latest
MAINTAINER recruiting@adhocteam.us

WORKDIR /root/
COPY --from=builder /go/src/github.com/adhocteam/homework/server .
RUN chmod a+x /root/server
CMD ["./server"]
