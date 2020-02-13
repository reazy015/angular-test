import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {QtyHandlerService} from '../qty-handler.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-feed-controls',
  templateUrl: './feed-controls.component.html',
  styleUrls: ['./feed-controls.component.css']
})
export class FeedControlsComponent implements OnInit {
  show = true;
  text = 'Remove';
  value = 0;
  @Output() containerShow = new EventEmitter<boolean>();


  constructor(private qtyHandlerService: QtyHandlerService) {
  }

  ngOnInit(): void {
    this.qtyHandlerService.getPostsQty.subscribe(res => this.value = res);
  }

  onRemoveContainerHandler() {
    this.show = !this.show;
    if (!this.show) {
      this.qtyHandlerService.postsQty.next(0);
    }
    this.text = this.show ? 'Remove' : 'Show';
    this.containerShow.emit(this.show);
  }

  onQtyChangeHandler(qty: number) {
    if (qty > 0) {
      this.qtyHandlerService.postsQty.next(qty);
    }
  }
}
