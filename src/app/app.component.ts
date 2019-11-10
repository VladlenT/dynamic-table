import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';
import { tableActions } from '@store/table';

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

  upload(file: File) {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener('load', () => {
      this.store.dispatch(
        tableActions.loadJSONSuccess({ data: JSON.parse(reader.result as string) }),
      );
    });
  }
}
