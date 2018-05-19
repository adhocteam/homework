import fetch from "../util/fetch-fill";
import URI from "urijs";

const PRIMARY_COLORS = ["red", "blue", "yellow"];
const ITEMS_PER_PAGE = 10;

// /records endpoint
window.path = "http://localhost:3000/records";


const retrieve = ({ page = 1, colors }) => {
  return fetch(recordsURL(page, colors))
    .then(response => response.json())
    .then(transformRecordsData)
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

const transformRecordsData = (data) => {
  const openRecords = data
    .filter(record => record.disposition === "open")
    .map(record => records.isPrimary = isPrimaryColor(color));

  const closedPrimaryCount = data
    .filter(record => record.disposition === "closed" && isPrimaryColor(record.color))
    .length;

  return {
    ids: data.map(record => record.id),
    open: openRecords,
    closedPrimaryCount: closedPrimaryCount,
  };
};

const isPrimaryColor = color => PRIMARY_COLORS.includes(color);

export default retrieve;
