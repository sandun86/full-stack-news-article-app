import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news-articles')
export class NewsArticle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'date' })
  publication_date: Date;

  @Column({ default: null })
  currents_api_article_id?: string = null;

  @Column({ default: null })
  url?: string = null;

  @Column({ default: null })
  author?: string = null;

  @Column({ default: null })
  image_url?: string = null;

  @Column({ default: null })
  language?: string = null;

  @Column({ default: null })
  category?: string;
}
