import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appFeedCardSize]'
})
export class FeedCardSizeDirective {
  classList: string[] = ['feed-card-single', 'feed-card-many'];
  @Input('appFeedCardSize') length: number;

  @HostBinding('class') get getClass(): string {
    if (this.length > 1) {
      return this.classList[1];
    }
    return this.classList[0];
  }

  constructor() {
  }
}
