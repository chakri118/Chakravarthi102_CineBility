

const api_key = "f5caa59c4615c75f40a41349cf9ece2a";
const imageBaseURL = "https://image.tmdb.org/t/p/";


const fetchDataFromServer = function (url, callback, optionalParam) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => callback(data, optionalParam));
};

export { imageBaseURL, api_key, fetchDataFromServer };
