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

A canonical response constructed as follows (in pseudo-code):

     stringified http status code + "\r\n" +
     <for each lexographically sorted (by name) http header>:
         header name + ": " + header value + "\r\n" +
     "X-Checksum-Headers: " + name[0] + ";" + name[1] + ";" + ... + ";" + name[n] + "\r\n\r\n" +
     body

X-Checksum-Headers is a list of the HTTP header names that were encountered in
the original response, so that a downstream client can deterministically
recreate the canonical response. (HTTP proxies between here and there may add
arbitrary headers.)

Your answer must be the hex-encoded SHA1 hash of the HTTP response in
`middleware_test.go` (the function that writes "We the people ..." to the body),
as well as your source code, which should go in the place indicated in
`middleware.go`. You must write Go code for this answer. Your code must pass the
unit test, i.e., `go test`.

    Answer: <SHA1 hash goes here>

Notes
-----

There are downloads and instructions for installing go at:
https://golang.org/doc/install . This code should work with Go version 1.3 or
greater.

Take care to get the right concatenation of status, headers, and body -- that's
a CRLF, or "\r" and "\n", between each component, and 2 of them between the last
header and the body.

If you are unfamiliar with writing middlewares in Go, read these blog posts:

* http://www.alexedwards.net/blog/making-and-using-middleware
* https://justinas.org/writing-http-middleware-in-go/

If you need a hint, try using
http://golang.org/pkg/net/http/httptest/#ResponseRecorder in your solution.
