import { Component, OnInit } from '@angular/core';
import { AppState } from '@store/reducers';
import { Store } from '@ngrx/store';
import { tableActions } from '@store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(tableActions.loadJSON({}));
  }

  getJSON(value: string): void {
    if (!value) {
      return;
    }

    this.store.dispatch(tableActions.loadJSON({ link: value }));
  }
}
