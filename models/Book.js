export default class Book {
  name: string;
  description: string;
  rating: number;
  liked: boolean;

  constructor(
    name: string,
    description: string,
    rating: number,
    liked: boolean,
  ) {
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.liked = liked;
  }
}
