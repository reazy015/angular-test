import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedNewsService {
  constructor(private http: HttpClient) { }
  public sendGetRequest(url: string) {
    return this.http.get(url);
  }
}
