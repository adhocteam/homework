import FetchConstructor from "fetch-ponyfill";
const fetchFill = FetchConstructor({ Promise: Promise });
export default fetchFill.fetch;
