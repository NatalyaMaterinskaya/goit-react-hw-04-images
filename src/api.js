import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const API_KEY = '38292054-24d10c6ab751dde75bf1a43b0';

export const fetchImages = async (query, page, perPage) => {
  const response = await axios.get('/', {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: perPage,
    },
  });
  const data = {
    totalHits: response.data.totalHits,
    hits: response.data.hits,
  };
  return data;
};
