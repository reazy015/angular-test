import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {FeedNewsService} from '../feed-news.service';
import {interval} from 'rxjs';
import {startWith} from 'rxjs/operators';
import {QtyHandlerService} from '../qty-handler.service';

interface FeedRequest {
  interval: number;
  postsQty: number;
  url: string;
}

@Component({
  selector: 'app-feeds-wrapper',
  templateUrl: './feeds-wrapper.component.html',
  styleUrls: ['./feeds-wrapper.component.css']
})
export class FeedsWrapperComponent implements OnInit, OnDestroy {
  @Input() props: FeedRequest;
  @Output() feedRequest: EventEmitter<any> = new EventEmitter();
  feeds = [];
  limit: number;
  feedSubscription;
  postsQtySubscription;

  constructor(private feedNewsService: FeedNewsService,
              private qtyHandlerService: QtyHandlerService) {
  }

  ngOnInit(): void {
    this.limit = this.props.postsQty;
    const feedInterval = interval(this.props.interval * 1000);
    this.feedSubscription = feedInterval.pipe(startWith(0)).subscribe(x => {
      this.feedNewsService.sendGetRequest(`${this.props.url}?limit=${this.limit}`).subscribe((data: any) => {
        this.feeds = data.slice(-this.props.postsQty);
        console.log(this.props);
        this.limit += this.props.postsQty;
      });
    });
    this.postsQtySubscription = this.qtyHandlerService.getPostsQty.subscribe(qty => {
      if (qty > 0) {
        this.props.postsQty = qty;
      }
    });
  }

  ngOnDestroy(): void {
    this.feedSubscription.unsubscribe();
    this.postsQtySubscription.unsubscribe();
  }
}
