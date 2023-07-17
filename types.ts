export interface INewsItem {
  id: string;
  title: string;
  body: string;
  image_url: string;
}
export interface IUser {
  user: { username: string; avatar_url: string };
}
