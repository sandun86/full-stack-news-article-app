import axios from 'axios';

export const getNewsArticles = async (currentPage: number) => {
  try {
    const newsArticles = await axios.get(
        `/news-articles?page=${currentPage}`
      );
    return newsArticles;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};