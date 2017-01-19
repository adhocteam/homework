Write a checksum middleware
===========================

You have been asked to add a checksum to all outgoing HTTP responses, as
a custom HTTP header.

Task
----

Write a HTTP handler function, which conforms to Go HTTP middleware conventions,
that wraps an HTTP response and modifies it to add the checksum.  It should get
the response from the HTTP handler it wraps, compute a checksum, add the
checksum as an HTTP header called `X-Checksum`, and send the response.
The checksum is the SHA1 hash (hex encoded string) of a "canonical response".

A canonical response is constructed as follows (in pseudo-code):

     stringified http status code + "\r\n" +
     <for each lexicographically sorted (by name) http header>:
         header name + ": " + header value + "\r\n" +
     "X-Checksum-Headers: " + name[0] + ";" + name[1] + ";" + ... + ";" + name[n] + "\r\n\r\n" +
     body

X-Checksum-Headers is a list of the HTTP header names that were encountered in
the original response, so that a downstream client can deterministically
recreate the canonical response. (HTTP proxies between here and there may add
arbitrary headers.)

Once you've written the middleware, run the server (`go run middleware.go`), and
make an HTTP GET request to the root '/' path, using `curl` or a similar tool.
Your answer is the value of the HTTP header `X-Checksum` in the response. It's a
hex-encoded SHA-1 hash, so it will be a 40-character string.

You must write Go code in the place indicated in `middleware.go`. There is a
unit test included in the file `middleware_test.go`: you can run `go test`
locally to try out your solution before submitting the answer.

    Answer: <checksum string goes here>

Notes
-----

There are downloads and instructions for installing go at:

    https://golang.org/doc/install

This code should work with Go version 1.3 or greater. You can
compile and run the `middleware.go` file by running:

   go run middleware.go

from this directory. Make sure the `go` executable is in your path.

Take care to get the right concatenation of status, headers, and body -- that's
a CRLF, or "\r" and "\n", between each component, and 2 of them between the last
header and the body.

If you are unfamiliar with writing middlewares in Go, read these blog posts:

* http://www.alexedwards.net/blog/making-and-using-middleware
* https://justinas.org/writing-http-middleware-in-go/

If you get an error message trying to run the server (`go run middleware.go`),
like "listen tcp :8080: bind: address already in use", you can pass a flag to
the program invocation instead, to have it listen on a port of your choosing:

    go run middleware.go -http 127.0.0.1:7070

If you are stuck and need a hint, base64-decode this string:

VHJ5IHVzaW5nIGh0dHA6Ly9nb2xhbmcub3JnL3BrZy9uZXQvaHR0cC9odHRwdGVzdC8jUmVzcG9uc2VSZWNvcmRlciBpbiB5b3VyIHNvbHV0aW9uLg==

Please `gofmt` your code before submitting!
