package main

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestChecksumMiddleware(t *testing.T) {
	req, err := http.NewRequest("GET", "http://foo.com/", nil)
	if err != nil {
		t.Fatal(err)
	}

	w := httptest.NewRecorder()
	f := func(w http.ResponseWriter, r *http.Request) {
		for _, kv := range [][2]string{
			{"Date", "Fri, 17 Apr 2015 19:45:39 GMT"},
			{"Content-Type", "text/html"},
			{"Server", "go/1.4.2"},
			{"Last-Modified", "Mon, 13 Apr 2015 20:50:04 GMT"},
		} {
			w.Header().Set(kv[0], kv[1])
		}
		fmt.Fprintf(w, "<p>We the people …</p>")
	}
	ChecksumMiddleware(http.HandlerFunc(f)).ServeHTTP(w, req)

	expected := "04dc9ef491b54c24d159cabdfd900c20d273efb6"
	if got := w.Header().Get("X-Checksum"); expected != got {
		t.Errorf("expected %q, got %q", expected, got)
	}
}
