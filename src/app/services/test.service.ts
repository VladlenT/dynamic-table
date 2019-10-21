import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  testFn() {
    return of('test');
  }

  testRequest(): Observable<object> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }
}
