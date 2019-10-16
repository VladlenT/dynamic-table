import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';
import { tableActions } from '@store/actions';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  entriesPerPage = [5, 10, 15, 25, 50];
  selectedEntries = this.entriesPerPage[1];

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  private _getJSON(link?: string) {
    this.http.get(link || '../../assets/data.json').subscribe(
      data => {
        this.store.dispatch(tableActions.loadJSON({ table: data }));
      },
      e => throwError(e),
    );
  }

  getJSON(link?: string) {
    this._getJSON(link);
  }
}
