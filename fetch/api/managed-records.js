import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

// Your retrieve function plus any additional functions go here ...
// +CUT+
const pageSize = 10;

// Fetch methods. Bonus points if these are written in a way that they could be refactored into their own reusable module

function checkStatus(response) {
  if (response.ok) {
    return response;
  } else {
    throw Error(response.statusText);
  }
}

function parseJSON(response) {
  return response.json();
}

function logError(error = "Unknown error") {
  console.log(`Fetch Homework ${error}`);
}

function handleError(error) {
  logError(error);
  return Promise.reject();
}

function getRecords(url) {
  return fetch(url)
    .then(checkStatus)
    .then(parseJSON)
    .catch(handleError);
}

// Transform Methods

function isPrimaryColor(color) {
  return ["red", "blue", "yellow"].includes(color);
}

function transform(jsonPayload, page) {
  const previousPage = page && page > 1 ? page - 1 : null;
  const nextPage = jsonPayload.length > pageSize ? page + 1 : null;

  if (jsonPayload.length > pageSize) {
    // Remove next-page peekahead item
    jsonPayload.pop();
  }

  const ids = jsonPayload.map(item => item.id);

  const open = jsonPayload
    .filter(item => item.disposition === "open")
    .map(item => {
      item.isPrimary = isPrimaryColor(item.color);
      return item;
    });

  const closedPrimaryCount = jsonPayload
    .filter(item => item.disposition === "closed")
    .reduce((total, item) => isPrimaryColor(item.color) ? total + 1 : total, 0);

  return { previousPage, nextPage, ids, open, closedPrimaryCount };
}

function retrieve(options = {}) {
  const parsedPath = URI(path);
  const page = options.page || 1;

  // Request one extra record to peek ahead at next page
  parsedPath.addSearch("limit", pageSize + 1);
  parsedPath.addSearch("offset", pageSize * (page - 1));

  if (options.colors) {
    options.colors.forEach(color => { parsedPath.addSearch("color[]", color); });
  }

  return getRecords(parsedPath.toString())
    .then(payload => transform(payload, page))
    .catch(logError);
}

// -CUT-

export default retrieve;
