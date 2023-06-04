const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35615782-928d74ab541d750ac5cbbfeb';
const perPage = 12;

export const getImages = async (query, page) => {
  console.log(query);
  const response = await fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
  if (!response.ok) {
    throw new Error('Smth went wrong');
  }

  return response.json();
};
