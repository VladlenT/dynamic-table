import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor(private http: HttpClient) {}

  getJSON(link?: string): Observable<any[] | object> {
    return this.http.get(link || '../../assets/data.json');
  }
}
