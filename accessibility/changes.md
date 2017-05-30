// Your recommended changes go here

There are two possible approaches to improving accessibility on this page:

1. Do the bare minimum to ensure the page complies with Section 508/WCAG guidelines, and has no major roadblocks for assisted technology users.

2. Overhaul the UI completely, so that it is easier for everyone to use (not just people with disabilities).

For the purposes of this exercise, I've chosen to do the latter. In my opinion, reformatting the page as follows would make the search and selection process significantly easier.

## Visual to the UI (CSS, visual elements)

All of the CSS on the current page meets accessibility requirements with the exception of the "remove" buttons in the selected items group. When a user hovers over or tabs to those buttons, the color changes to white text on a light gray background, which fails accessibility contrast requirements. If the current format is retained, this would need to be addressed. If the page was reformatted in the manner suggested below, it would not be an issue.

## Technical changes: HTML, CSS, Javascript, ARIA attributes

1. Do away with the "Your doctors, medical facilities & prescription drugs" section entirely, and move to a single section approach. Use checkboxes to toggle selected doctors, facilities, and drugs on and off.

2. Make the markup more semantic to provide screenreader users with more information, which is easier to understand in context.  

Here is the basic HTML structure I would suggest. For the sake of brevity, I've omitted classes and ID's that are not essential to functionality or accessibility, as well as Angular specific code:

<!-- Search form -->
<label for="search-input">Enter ONE doctor, facility, or prescription drug at a time</label>
<input type="search" id="search-input" required />
<button>SEARCH</button>

<!-- Search results -->
<fieldset>
  <legend>Doctors</legend>
  <ol>
  <li>
    <label for="one">Anna Smith</label>
    <input type="checkbox" id="one">
    <p>Dentist · General Practice</p>
    <p>General Practitioner</p>
    <p>Chicago, IL 60647 (0.00 Miles Away)</p>
  </li>
  <li>
    <label for="two">Ron Smith</label>
    <input type="checkbox" id="two">
    <p>Dentist · General Practice</p>
    <p>General Practitioner</p>
    <p>Chicago, IL 60647 (2.00 Miles Away)</p>
  </li>
  <!-- repeat format for all items in list -->
  </ol>
</fieldset>
<a href="#">More <span class="sr-only">Doctors</span></a>
<!-- Repeat above structure for facilities and drugs, with each group encapsulated in a fieldset -->

Benefits of this format over the current one:

1. Screenreader users will get a verbal notification of how many items are in each list, as well as what it is a list of (e.g.: Doctors, Facilities, or Drugs).

2. In the current format, the screenreader user isn't notified when items are selected and added to their list, because the list of selected items doesn't have an aria-live attribute on it. In this modified format, aria attributes become unnecessary, because the user can simply tab through the list and hear whether the checkbox corresponding to the item is selected or not. Big green checkmarks and outlines around selected items could give a visual indicator of selected items for sighted and low-vision users (and it would look better too).

3. It greatly reduces the amount of tabbing/scrolling a user needs to do to navigate through the process, because they don't have to jump back and forth from the search results and selected lists. Simpler = better.

4. It removes repetitive information which can be confusing to all users, particularly people with cognitive disabilities.

## Content

I think the general content is good, and with the exception of adding more descriptive hidden text for screenreader users in a few places (like the "more" links), I don't see any major issues.
