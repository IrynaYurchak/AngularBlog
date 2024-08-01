export interface IPost {
    id: number;
    postedBy: string;
    topic: string;
    date: Date;
    message: string;
  }
  
  export interface IAuthor {
    id: number;
    username: string;
    email: string;
    password: string;
  }