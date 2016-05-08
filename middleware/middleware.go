package main

import (
	"flag"
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

// Do not change this function.
func main() {
	var listenAddr = flag.String("http", ":8080", "address to listen on for HTTP")
	flag.Parse()

	http.Handle("/", ChecksumMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Foo", "bar")
		w.Header().Set("Content-Type", "text/plain")
		fmt.Fprintf(w, "Here are the headers you sent:\n\n")
		for k, v := range r.Header {
			fmt.Fprintf(w, "* %s: %s\n", k, v)
		}
	})))

	log.Fatal(http.ListenAndServe(*listenAddr, nil))
}
