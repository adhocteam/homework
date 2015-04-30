package main

import (
	"fmt"
	"log"
	"net/http"
)

const (
	crlf       = "\r\n"
	colonspace = ": "
)

func ChecksumMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// your code goes here ...
	})
}

func main() {
	http.Handle("/", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "hello, world\n")
	}))
	log.Fatal(http.ListenAndServe(":8080", nil))
}
