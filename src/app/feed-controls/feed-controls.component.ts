import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {QtyHandlerService} from '../qty-handler.service';
import {log} from 'util';

@Component({
  selector: 'app-feed-controls',
  templateUrl: './feed-controls.component.html',
  styleUrls: ['./feed-controls.component.css']
})
export class FeedControlsComponent implements OnInit {
  show = true;
  @Output() containerShow = new EventEmitter<boolean>();

  constructor(private qtyHandlerService: QtyHandlerService) {
  }

  ngOnInit(): void {
  }

  onRemoveContainerHandler() {
    this.show = !this.show;
    this.containerShow.emit(this.show);
  }

  onQtyChangeHandler(event) {
    const nextQty = parseInt(event.target.value, 10);
    if (nextQty > 0) {
      this.qtyHandlerService.postsQty.next(nextQty);
    }
  }
}
