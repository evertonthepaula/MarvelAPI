const axios = require('axios');

export default axios.create({
  method: 'get',
  baseURL: 'https://gateway.marvel.com/v1/public',
});
