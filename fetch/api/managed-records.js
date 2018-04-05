import fetch from "../util/fetch-fill";
import URI from "urijs";

// /records endpoint 
window.path = "http://localhost:3000/records";

const retrieve = async options => {
  try {
    const queries = new QueryBuilder(options);
    const { page, colors } = queries;
    let uri = new URI(window.path);
    uri.search({ limit: 10, offset: page * 10 - 10, 'color[]': colors });

    const res = await fetch(uri);
    const jsonRes = await res.json();
    let result = {
      previousPage: null,
      nextPage: null,
      ids: [],
      open: [],
      closedPrimaryCount: 0
    };

    jsonRes.forEach(colorObj => {
      result.ids.push(colorObj.id);
      if (colorObj.disposition === 'open') { 
        result.open.push(Object.assign({}, colorObj, { isPrimary: checkPrimary(colorObj.color) }));
      }
      if (colorObj.disposition === 'closed' && checkPrimary(colorObj.color)) { 
        result.closedPrimaryCount++;
      }
    });
    result.previousPage = calcPrevPage(page);
    result.nextPage = calcNextPage(page, result.open);
    
    return result;
  } catch (error) {
    console.log(error);
  }
};

const allColors = ['red', 'brown', 'blue', 'yellow', 'green'];
const primaryColors = ['red', 'blue', 'yellow'];

class QueryBuilder {
  constructor(params = { page: 1, colors: allColors }) {
    this.page = params.page || 1;
    this.colors = params.colors || allColors;
  }
}

const checkPrimary = color => primaryColors.includes(color);
const calcPrevPage = page => page > 1 ? page - 1 : null;
const calcNextPage = (page, openArray) => page < 50 && openArray.length ? page + 1 : null;

export default retrieve;