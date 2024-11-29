//import fs from 'fs';
//import path from 'path';
import got from 'got';

// A function that returns names and ids from json file and sorts by name

// Define URL for REST endpoint
const dataURL =
  'https://dev-teevan-fall-cs55-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/special';

export async function getSortedFruitsList() {
  //get filepath to json
  //const filePath = path.join(pathToData, 'fruits.json');

  //load json's contents
  //const jsonString = fs.readFileSync(filePath, 'utf8');

  // Instead we will load the data from our endpoint with got
  let jsonString;
  try {
    // here we use got to synchronously retrieve via https our json data from the wp site
    jsonString = await got(dataURL);
    console.log('Fetched:', jsonString.body);
  } catch {
    jsonString.body = [];
    console.log(error);
  }

  //convert returned string into a json object
  //const jsonObj = JSON.parse(jsonString);

  // same step but instead with got we do this
  const jsonObj = JSON.parse(jsonString.body);

  //sort json by name property
  jsonObj.sort((a, b) => {
    return a.post_title.localeCompare(b.post_title);
  });

  //use map() to extract id and name to be made into a new json object
  return jsonObj.map((item) => {
    return {
      id: item.ID.toString(),
      name: item.post_title,
    };
  });
}

//function to return ids for all json objects
export async function getFruitIds() {
  //get filepath to JSON
  //const filePath = path.join(pathToData, 'fruits.json');

  //load json's contents
  // const jsonString = fs.readFileSync(filePath, 'utf8');

  // Instead we will load the data from our endpoint with got
  let jsonString;
  try {
    // here we use got to synchronously retrieve via https our json data from the wp site
    jsonString = await got(dataURL);
    console.log('Fetched:', jsonString.body);
  } catch (error) {
    jsonString.body = [];
    console.log(error);
  }

  //convert returned string into a json object
  //const jsonObj = JSON.parse(jsonString);

  // same but instead with got we do..
  const jsonObj = JSON.parse(jsonString.body);

  //use map() to extract id and name to be made into a new json object
  return jsonObj.map((item) => {
    return {
      params: {
        id: item.ID.toString(),
      },
    };
  });
}

//function to return each of he properties for one single object with a match id prop value
export async function getFruitData(idRequested) {
  //get filepath to json
  //const filePath = path.join(pathToData, 'fruits.json');

  //load json's contents
  //const jsonString = fs.readFileSync(filePath, 'utf8');

  // Instead we will load the data from our endpoint with got
  let jsonString;
  try {
    // here we use got to synchronously retrieve via https our json data from the wp site
    jsonString = await got(dataURL);
    console.log(jsonString.body);
  } catch {
    jsonString.body = {};
    console.log(error);
  }

  //convert returned string into a json object
  //const jsonObj = JSON.parse(jsonString);
  const jsonObj = JSON.parse(jsonString.body);

  //find object value in array that has a matching id
  const objMatch = jsonObj.filter((obj) => {
    return obj.ID.toString() === idRequested;
  });

  //extract object value in filtered array if found
  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }

  //return object value found
  return objReturned;
}
