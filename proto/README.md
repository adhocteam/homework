Parse a custom protocol format
==============================

Your application must interface with an old-school mainframe MPS7 for payment
processing. This means consuming a proprietary binary protocol format.

Task
----

You must read in a file, `txnlog.dat`, and parse it according to the
specification in Notes below.

You must answer the following questions:

* What is the total amount in dollars of debits?
* What is the total amount in dollars of credits?
* How many autopays were started?
* How many autopays were ended?
* What is balance of user ID 2456938384156277127?

You must supply your source code as part of your answer. Write your code in your
best programming language.

We will want to compile your code from source and run it, so please include the
complete instructions for doing so in a COMMENTS file.

Notes
-----

MPS7 transaction log specification:

Header:

| 4 byte magic string "MPS7" | 1 byte version | 4 byte (uint32) # of records |

The header contains the canonical information about how the records should be processed.

Record:

| 1 byte record type enum | 4 byte (uint32) Unix timestamp | 8 byte (uint64) user ID |

Record type enum:

* 0x00: Debit
* 0x01: Credit
* 0x02: StartAutopay
* 0x03: EndAutopay

For Debit and Credit record types, there is an additional field, an 8 byte
(float64) amount in dollars, at the end of the record.

All multi-byte fields are encoded in network byte order.
