import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint
window.path = "http://localhost:3000/records";

const retrieve = () => {
  const recordsURL = URI(window.path)
    .search("limit", "10")

  fetch(recordsURL)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default retrieve;
