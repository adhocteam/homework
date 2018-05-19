import fetch from "../util/fetch-fill";
import URI from "urijs";

const PRIMARY_COLORS = ["red", "blue", "yellow"];
const ITEMS_PER_PAGE = 10;

// /records endpoint
window.path = "http://localhost:3000/records";


// ==================
// Record retrieving functions
// ==================
const retrieve = ({ page = 1, colors } = {}) => {
  return fetch(recordsURL(page, colors))
    .then(response => response.json())
    .then(data => transformRecordsData(page, data))
    .catch((error) => {
      console.log("Request error", error);
    });
};

const recordsURL = (page, colors) => {
  const url = URI(window.path).search({
    limit: ITEMS_PER_PAGE + 1, // Adding +1 to check if next page has records
    offset: (page - 1) * ITEMS_PER_PAGE,
  });

  if (colors) url.addSearch("color[]", colors);

  return url;
};


// ==================
// Data transformation functions
// ==================
const transformRecordsData = (page, originalData) => {
  const desiredData = originalData.slice(0, ITEMS_PER_PAGE);

  const openRecords = desiredData
    .filter(record => record.disposition === "open")
    .map(record => Object.assign(record, { isPrimary: isPrimaryColor(record.color) }));

  const closedPrimaryCount = desiredData
    .filter(record => record.disposition === "closed" && isPrimaryColor(record.color))
    .length;

  return {
    ids: desiredData.map(record => record.id),
    open: openRecords,
    closedPrimaryCount: closedPrimaryCount,
    previousPage: page === 1 ? null : page - 1,
    nextPage: originalData.length > ITEMS_PER_PAGE ? page + 1 : null,
  };
};

const isPrimaryColor = color => PRIMARY_COLORS.includes(color);


export default retrieve;
