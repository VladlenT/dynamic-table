import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private tableData = new Subject();

  entriesPerPage = [5, 10, 15, 25, 50];
  selectedEntries = this.entriesPerPage[2];

  constructor(private http: HttpClient) {}

  private _getJSON(link?: string) {
    this.http
      .get(link || '../../assets/data.json')
      .subscribe(data => this.tableData.next(data), e => throwError(e));
  }

  getJSON(link?: string) {
    this._getJSON(link);
  }

  getTableData() {
    return this.tableData.asObservable();
  }
}
