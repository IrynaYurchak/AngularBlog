import { Injectable } from '@angular/core';
import { IPost, IAuthor } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BlogserviseService {
  private posts: Array<IPost> = [{
    id: 1,
    topic: 'First post',
    postedBy: 'admin',
    date: new Date(2024, 6, 30, 16, 44, 50),
    message: 'Sign up to create your account and start to use Angular Blog'
  }];
  private users: Array<IAuthor> = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@gmail.com',
      password: '12345',
    },
  ];

  constructor() { }

  getPost(): Array<IPost> {
    return this.posts;
  }

  getUser(): Array<IAuthor> {
    return this.users;
  }

  addPost(post: IPost): void {
    this.posts.push(post);
  }

  addUser(user: IAuthor): string | null {
    const usernameExists = this.users.some(u => u.username === user.username);
    const emailExists = this.users.some(u => u.email === user.email);

    if (usernameExists) {
      return 'Username is already taken';
    }
    if (emailExists) {
      return 'Email is already taken';
    }

    this.users.push(user);
    return null;
  }

  updatePost(post: IPost): void {
    const index = this.posts.findIndex(p => p.id === post.id);
    if (index !== -1) {
      this.posts[index] = post;
    }
  }

  deletePost(post: IPost): void {
    this.posts = this.posts.filter(p => p.id !== post.id);
  }
}