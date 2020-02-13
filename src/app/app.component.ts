import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  containerVisible = true;
  postsQty = 0;
  updateFeedContainerStatus(status: boolean) {
    this.containerVisible = status;
  }
  updatePostsQty(qty: number) {
    this.postsQty = qty;
  }
}
