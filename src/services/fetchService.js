import axios from "axios";

const fetchApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });

export default fetchApi;
