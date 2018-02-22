Parse a custom protocol format
==============================

Your payment processing application must interface with an old-school mainframe format that we've named "MPS7".
This means consuming a proprietary binary protocol format that no one on your team is familiar with yet.

Task
----

You must read in a transaction log, `txnlog.dat`, and parse it according to the
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

Because `txnlog.dat` is a binary file, it can't be read by a normal text editor like sublime or vim.
Instead, you'll need to read it programatically and parse the data you read in from there.

This is how the transaction log is structured:

Header:

| 4 byte magic string "MPS7" | 1 byte version | 4 byte (uint32) # of records |

The header contains the canonical information about how the records should be processed.
Note: there are fewer than 100 records in `txnlog.dat`.

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

The first record in the file, when fully parsed, will look something like this:

| Record type | Unix timestamp | user ID             | amount in dollars |
| 'Debit'     | 1393108945     | 4136353673894269217 | 604.274335557087  |
