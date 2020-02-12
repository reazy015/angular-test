import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import { FeedNewsService } from './feed-news.service';
import { interval } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})

export class FeedsComponent implements OnInit {
  @Input() props: {interval: number, postsQty: number, url: string};
  @Output() feedRequest: EventEmitter<any> = new EventEmitter();
  feeds = [];
  limit = 0;
  feedInterval;
  constructor(private feedNewsService: FeedNewsService) { }
  emit(name: string) {
    this.feedRequest.emit(name);
  }
  ngOnInit(): void {
    this.limit = this.props.postsQty;
    this.feedInterval = interval(this.props.interval * 1000);
    this.feedInterval.pipe(startWith(0)).subscribe(x => {
      this.feedNewsService.sendGetRequest(`${this.props.url}?limit=${this.limit}`).subscribe((data: any) => {
        this.feeds = data.slice(-this.props.postsQty);
        this.limit += this.props.postsQty;
      });
    });
  }
  ngOnDestroy() {
    console.log('destroyed');
    this.feedInterval.usubscribe();
  }
}
