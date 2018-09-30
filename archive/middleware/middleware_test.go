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

	code := 418
	headers := [][2]string{
		{"Date", "Fri, 17 Apr 2015 19:45:39 GMT"},
		{"Content-Type", "text/html"},
		{"Server", "go/1.4.2"},
		{"Last-Modified", "Mon, 13 Apr 2015 20:50:04 GMT"},
	}
	body := "<p>We the people …</p>"

	w := httptest.NewRecorder()
	f := func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(code)
		for _, kv := range headers {
			w.Header().Set(kv[0], kv[1])
		}
		fmt.Fprintf(w, body)
	}

	ChecksumMiddleware(http.HandlerFunc(f)).ServeHTTP(w, req)

	if w.Code != code {
		t.Errorf("expected %d, got %d", code, w.Code)
	}

	for _, kv := range headers {
		if got := w.HeaderMap.Get(kv[0]); kv[1] != got {
			t.Errorf("%q: expected %q, got %q", kv[0], kv[1], got)
		}
	}

	if got := w.Body.String(); body != got {
		t.Errorf("expected %q, got %q", body, got)
	}

	expected := "814a8da9ad27cd0c0a2cea3536daa3a8b12926b3"
	if got := w.Header().Get("X-Checksum"); expected != got {
		t.Errorf("expected %q, got %q", expected, got)
	}
}
