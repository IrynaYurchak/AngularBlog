import { Component } from '@angular/core';
import { AngularBlogComponent } from './angular-blog/angular-blog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [AngularBlogComponent]
})

export class AppComponent {
  title = 'MockData';
}
