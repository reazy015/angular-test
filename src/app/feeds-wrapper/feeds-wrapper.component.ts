import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {FeedNewsService} from '../feed-news.service';
import {interval, Observable, Subject} from 'rxjs';
import {concatMap, map, mergeMap, startWith, takeUntil} from 'rxjs/operators';
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
  unsubscribe = new Subject<void>();
  feeds;
  limit: number;
  postsQtySubscription;

  constructor(private feedNewsService: FeedNewsService,
              private qtyHandlerService: QtyHandlerService) {
  }

  ngOnInit(): void {
    this.limit = this.props.postsQty;
    this.feeds = interval(this.props.interval * 1000)
      .pipe(startWith(0),
        takeUntil(this.unsubscribe),
        mergeMap(_ => this.feedNewsService.sendGetRequest(`${this.props.url}?limit=${this.limit}`)),
        map((feeds: [object]) => {
          this.limit += this.props.postsQty;

          return feeds.slice(-this.props.postsQty).map((feed: any) => {
            return {
              text: feed.text,
              created_at: feed.created_at,
              name: feed.user.name,
              avatar: feed.user.profile_image_url
            };
          });
        }));

    this.postsQtySubscription = this.qtyHandlerService.getPostsQty
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(qty => {
        if (qty > 0) {
          this.props.postsQty = qty;
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
