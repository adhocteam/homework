import fetch from "../util/fetch-fill";
import URI from "urijs";

const PRIMARY_COLORS = ["red", "blue", "yellow"];
const ITEMS_PER_PAGE = 10;

// /records endpoint
window.path = "http://localhost:3000/records";


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
    limit: ITEMS_PER_PAGE,
    offset: (page - 1) * ITEMS_PER_PAGE,
  });

  if (colors) url.addSearch("color[]", colors);

  return url;
};

const transformRecordsData = (page, data) => {
  const openRecords = data
    .filter(record => record.disposition === "open")
    .map(record => Object.assign(record, { isPrimary: isPrimaryColor(record.color) }));

  const closedPrimaryCount = data
    .filter(record => record.disposition === "closed" && isPrimaryColor(record.color))
    .length;

  return {
    ids: data.map(record => record.id),
    open: openRecords,
    closedPrimaryCount: closedPrimaryCount,
    previousPage: page === 1 ? null : page,
    nextPage: data.length < 10 ? null : page + 1,
  };
};

const isPrimaryColor = color => PRIMARY_COLORS.includes(color);

export default retrieve;
