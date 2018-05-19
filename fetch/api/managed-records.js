import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

const retrieve = ({ page = 1, colors }) => {
  const recordsURL = URI(window.path).search({
    limit: 10,
    offset: (page - 1) * 10,
  });

  if (colors) recordsURL.addSearch('color[]', colors);

  console.log('recordsURL ----->', recordsURL.toString());

  return fetch(recordsURL)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('Request error', error);
    });
};

export default retrieve;
