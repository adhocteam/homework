Household builder
=================

Your application needs a way to capture information about a household applying
for health insurance coverage. Develop a UI for building a household up from
individual people.

Task
----

You have been given an HTML page with a form and a placeholder for displaying
a household.

Write out JavaScript in the space provided that can:

* Validate data entry (age is required and > 0, relationship is required)
* Add people to a growing household list
* Remove a previously added person from the list
* Display the household list in the HTML as it is modified
* Serialize the household as JSON upon form submission as a fake trip to the server

Notes
-----

You must write JavaScript, not a language that compiles down to JavaScript. You
must use ES3 or ES5 standard. Assume the capabilities of a modern mainstream
browser in wide use, i.e., no bleeding-edge features. No 3rd party libraries --
i.e., no jQuery.

The display of the household list is up to you.

Put the serialized JSON in the provided "debug" DOM element.

Don't modify the initial HTML provided. (Obviously, you can modify the DOM.)
