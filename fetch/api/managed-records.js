import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

const retrieve = ({ page = 1, colors }) => {
  const recordsURL = URI(window.path).search({
    limit: 10,
    offset: (page - 1) * 10,
  });

  console.log('recordsURL ----->', recordsURL.toString());

  fetch(recordsURL)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default retrieve;
