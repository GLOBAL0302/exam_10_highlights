export interface INews {
  id: string;
  title: string;
  description: string;
  image: string | null;
  create_at: string;
}

export interface IComments {
  id: string;
  news_id: string;
  author: string;
  description: string;
}
