import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QtyHandlerService {
  postsQty = new BehaviorSubject(0);

  constructor() {
  }

  get getPostsQty() {
    return this.postsQty;
  }
}
