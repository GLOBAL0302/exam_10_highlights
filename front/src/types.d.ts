export interface INews {
  id: string;
  title: string;
  description: string;
  image: string | null;
  created_at: string;
}

export interface INewsMutation {
  title: string;
  description: string;
  image: File | null;
}

export interface IComments {
  id: string;
  news_id: string;
  author: string;
  description: string;
}

export interface ICommentsMutation {
  news_id: string;
  author: string;
  description: string;
}
export type ICommentWithOutId = Omit<ICommentsMutation, 'news_id'>;
