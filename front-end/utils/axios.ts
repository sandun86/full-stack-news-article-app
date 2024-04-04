import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
axios.defaults.baseURL = apiUrl;

//set common settings for the axios
const instance = axios.create({
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "x-api-key": apiKey,
      "Content-Type": "application/json",
    },
});

console.log(apiKey);
export default instance;