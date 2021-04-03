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

exports.getCharacter = async (id) => {
  const res = await axios({
    method: 'GET',
    url: `https://tarea-1-breaking-bad.herokuapp.com/api/characters/${id}`,
  });

  return res.data;
};

exports.getCharacterByName = async (name) => {
  const res = await axios({
    method: 'GET',
    url: `https://tarea-1-breaking-bad.herokuapp.com/api/characters?name=${name}`,
  });

  return res.data;
};
