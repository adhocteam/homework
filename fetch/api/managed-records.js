import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

const retrieve = ({ page = 1, colors }) => {
  return fetch(recordsURL(page, colors))
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('Request error', error);
    });
};

const recordsURL = (page, colors) => {
  const url = URI(window.path).search({
    limit: 10,
    offset: (page - 1) * 10,
  });

  if (colors) url.addSearch('color[]', colors);

  return url;
};

export default retrieve;
