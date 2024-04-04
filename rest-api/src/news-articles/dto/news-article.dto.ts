export class NewsArticleDto {
  id: number;
  title: string;
  content: string;
  publication_date: Date;
  currents_api_article_id?: string;
  url?: string;
  author?: string;
  image_url?: string;
  language?: string;
  category?: string;
}
