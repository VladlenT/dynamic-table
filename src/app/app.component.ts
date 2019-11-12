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

  // Currently, Angular test environment doesn't wait for FileReader events with async nor with fakeAsync
  // so we can't test if actions actually get dispatched

  /* istanbul ignore next */
  read(file: File): File {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener('load', () => {
      try {
        const parsedJSON = JSON.parse(reader.result as string);
        this.store.dispatch(tableActions.loadJSONSuccess({ data: parsedJSON }));
      } catch (e) {
        console.log(e);
        this.store.dispatch(tableActions.loadJSONError({ error: new Error(e) }));
      }
    });
    return file;
  }
}
