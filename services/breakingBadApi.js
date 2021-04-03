const axios = require('axios');

exports.getEpisodes = async () => {
  const res = await axios({
    method: 'GET',
    url: 'https://tarea-1-breaking-bad.herokuapp.com/api/episodes',
  });

  return res.data;
};

exports.getQuotes = async (name) => {
  const res = await axios({
    method: 'GET',
    url: `https://tarea-1-breaking-bad.herokuapp.com/api/quote?author=${name}`,
  });

  return res.data;
};

exports.getCharacterByName = async (name, offset) => {
  const res = await axios({
    method: 'GET',
    url: `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${name}&limit=10&offset=${offset}`,
  });

  return res.data;
};
