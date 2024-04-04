import { useState, useEffect } from "react";
import axios from "../utils/axios";
import CustomPagination from "../components/Pagination";
import NewsArticleTable from "../components/NewsArticleTable";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Head from "next/head";

const Home = () => {
  const [newsArticles, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchNewsArticles();
  }, [currentPage]);

  const fetchNewsArticles = async () => {
    try {
      const response = await axios.get(
        `/news-articles?page=${currentPage}`
      );
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.totalPages));
      setLoading(false);
    } catch (error) {
      setData([]);
      setLoading(false);
      setError(true);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-5">
      <Head>
        <title>News Articles</title>
      </Head>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Failed to fetch news articles. Please try again later." />
      ) : (
        <>
          <NewsArticleTable articles={newsArticles} />
          <CustomPagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default Home;
