// Middleware
//
// This is an annotated solution to a past homework assignment. Conceptually,
// it asks a candidate to create a middleware function on an http server, which
// computes a checksum of the http status code and response headers of an
// inbound request. This involves sorting the headers of the response in a
// specified way, hashing the output, and adding the checksum headers and hash
// as new headers to the response.
//
// Graders of middleware look for
//
// Clarity:
//   1. The solution uses the provided constants and imports or removes them.
//   2. It leverages the Go standard library where appropriate, like for joining
//      strings.
//   3. It is written in a way that is easy for others to understand,
//      avoiding unncessary abstractions.
//
// Performance:
//   1. The solution uses two for loops. No more should be needed to solve
//      this particular problem.
//   2. It does not unneccessarily copy around data.
//
// Correctness:
//   1. The solution passes tests with the correct output format.
//   2. It adds both requested headers in the response when curled.

package main

import (
	"crypto/sha1"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"sort"
	"strconv"
	"strings"
)

const (
	crlf       = "\r\n"
	colonspace = ": "
)

func ChecksumMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		// Reference solution starts here - code below would have been cut out when this problem was active!

		// create a ResponseRecorder, capturing the response status code,
		// map of the headers, and body bytes
		rec := httptest.NewRecorder()

		// write reply headers and data to the ResponseWriter from the inbound Request
		// Note: it is not unusual for candidates to attempt to serve multiple times,
		// this is not necessary, and could be detrimental for requests that are not idempotent.
		h.ServeHTTP(rec, r)
		var (
			headers []string
			names   []string
		)

		// "canonicalize" the header names (i.e. 'content-type' becomes 'Content-Type')
		// and add them to the ResponseWriter, building slices of the header names and
		// values.
		// Note: This is the only looping required to gather the necessary checksum
		// information -- the header and the contents of each header's slice of values.
		for k, v := range rec.Header() {
			k = http.CanonicalHeaderKey(k)
			w.Header()[k] = v
			for _, vv := range v {
				headers = append(headers, k+colonspace+vv)
				names = append(names, k)
			}
		}
		// sort header and canonical response slices to build X-Checksum-Headers
		// Note: it is preferable to join the strings with strings.Join rather
		// than looping and concatenation
		sort.Strings(names)
		sort.Strings(headers)
		headers = append(headers, "X-Checksum-Headers"+colonspace+strings.Join(names, ";"))

		// hash the response body to create a checksum
		hsh := sha1.New()
		io.WriteString(hsh, strconv.Itoa(rec.Code)+crlf)
		io.WriteString(hsh, strings.Join(headers, crlf)+crlf+crlf)
		hsh.Write(rec.Body.Bytes())
		chksum := hsh.Sum(nil)

		// write the headers, status code, and body to the ResponseWriter.
		// Note: Calling ServeHTTP here would invalidate the ResponseWriter
		// passed to this middleware function, as a ResponseWriter cannot be
		// used after invoking Handler.ServeHTTP.
		w.Header().Set("X-Checksum", fmt.Sprintf("%x", chksum))
		w.Header().Set("X-Checksum-Headers", strings.Join(names, ";"))
		w.WriteHeader(rec.Code)
		w.Write(rec.Body.Bytes())

		// Reference solution ends here!

	})
}

// Do not change this function.
func main() {
	var listenAddr = flag.String("http", "localhost:8080", "address to listen on for HTTP")
	flag.Parse()

	l := log.New(os.Stderr, "", 1)

	http.Handle("/", ChecksumMiddleware(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		l.Printf("%s - %s", r.Method, r.URL)
		w.Header().Set("X-Foo", "bar")
		w.Header().Set("Content-Type", "text/plain")
		w.Header().Set("Date", "Sun, 08 May 2016 14:04:53 GMT")
		msg := "Curiosity is insubordination in its purest form.\n"
		w.Header().Set("Content-Length", strconv.Itoa(len(msg)))
		fmt.Fprintf(w, msg)
	})))

	log.Fatal(http.ListenAndServe(*listenAddr, nil))
}
