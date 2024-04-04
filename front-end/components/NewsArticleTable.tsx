import { Table } from "react-bootstrap";

interface TableProps {
    articles: NewsArticle[];
}

interface NewsArticle {
  id: number;
  title: string;
  content: string;
  url: string;
  author: string;
  language: string;
  image_url: string;
  category: string;
  publication_date: Date;
}

const NewsArticleTable: React.FC<TableProps> = ({ articles }) => {
  return (
    <>
      <h1>News articles List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Content</th>
            <th>URL</th>
            <th>Author</th>
            <th>Language</th>
            <th>Category</th>
            <th>Image</th>
            <th>Publication date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={index}>
              <td>{article.id}</td>
              <td>{article.title}</td>
              <td>{article.content}</td>
              <td>{article.url}</td>
              <td>{article.author}</td>
              <td>{article.language}</td>
              <td>{article.category}</td>
              <td><img src={article.image_url} alt="" height='100' width='200'></img></td>
              <td>{article.publication_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
export default NewsArticleTable;
