import { Component, OnInit } from '@angular/core';
import { BlogserviseService } from './shared/servises/blogservise.service';
import { IPost, IAuthor } from './shared/interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import{CommonModule} from '@angular/common'
@Component({
  selector: 'app-angular-blog',
  standalone: true,
  templateUrl: './angular-blog.component.html',
  styleUrls: ['./angular-blog.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class AngularBlogComponent implements OnInit {
  public headerBtnUser = false;
  public signInForm = false;
  public addPostForm = false;
  public editStatus = false;
  public signUpForm = false;
  public btnInBox = false;
  public posts: IPost[] = [];
  public authors: IAuthor[] = [];
  public currentUser: IAuthor | null = null;
  public signInData = { email: '', password: '' };
  public signUpData = { username: '', email: '', password: '' };
  public newPost: IPost = { id: 0, topic: '', postedBy: '', date: new Date(), message: '' };
  public signUpError: string | null = null; 

  constructor(private BlogserviseService: BlogserviseService) {}

  ngOnInit(): void {
    this.posts = this.BlogserviseService.getPost();
    this.authors = this.BlogserviseService.getUser();
    this.autoSignInAdmin();
  }

  signIn(): void {
    this.signInForm = true;
    this.reset();
  }

  signUp(): void {
    this.reset();
    this.signUpForm = true;
  }

  addPost(): void {
    this.reset();
    this.addPostForm = true;
    this.editStatus = true;
  }

  signOut(): void {
    this.headerBtnUser = false;
    this.currentUser = null;
  }

  closeSignIn(): void {
    this.signInForm = false;
  }

  closeSignUp(): void {
    this.signUpForm = false;
  }

  closeAddPost(): void {
    this.addPostForm = false;
  }

  submitSignIn(): void {
    const user = this.authors.find(author =>
      author.email === this.signInData.email &&
      author.password === this.signInData.password
    );

    if (user) {
      this.headerBtnUser = true;
      this.currentUser = user;
      this.signInForm = false;
    } else {
      alert('Invalid login credentials');
    }
  }

  submitSignUp(): void {
    const newUser: IAuthor = {
      id: this.authors.length + 1,
      username: this.signUpData.username,
      email: this.signUpData.email,
      password: this.signUpData.password
    };

    const error = this.BlogserviseService.addUser(newUser);
    if (error) {
      this.signUpError = error;
    } else {
      this.headerBtnUser = true;
      this.currentUser = newUser;
      this.signUpForm = false;
    }
  }

  autoSignInAdmin(): void {
    const admin = this.authors.find(author => author.username === 'admin');
    if (admin) {
      this.currentUser = admin;
      this.btnInBox = true;
    }
  }

  post(): void {
    const newPost: IPost = {
      id: this.posts.length + 1,
      topic: this.newPost.topic,
      postedBy: this.currentUser?.username || 'Unknown',
      date: new Date(),
      message: this.newPost.message
    };
    this.BlogserviseService.addPost(newPost);
    this.addPostForm = false;
  }

  editPost(post?: IPost): void {
    if (post) {
      this.newPost = { ...post }; 
      this.editStatus = false; 
      this.addPostForm = true; 
    }
  }

  updatePost(): void {
    const index = this.posts.findIndex(post => post.id === this.newPost.id);
    if (index !== -1) {
      this.posts[index] = this.newPost; 
      this.BlogserviseService.updatePost(this.newPost); 
      console.log('Post updated:', this.newPost); 
    }
    this.reset();
    this.addPostForm = false;
    this.editStatus = false; 
  }

  deletePost(post: IPost): void {
    this.posts = this.posts.filter(p => p.id !== post.id);
    this.BlogserviseService.deletePost(post);
  }

  reset(): void {
    this.newPost = { id: 0, topic: '', postedBy: '', date: new Date(), message: '' };
    this.signInData = { email: '', password: '' };
    this.signUpData = { username: '', email: '', password: '' };
    this.signUpError = null; 
  }
}