import { Component, EventEmitter, Input, Output } from '@angular/core';

// TODO: refactor to [(select)]

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
})
export class EntriesComponent {
  @Input() entriesPerPage = [5, 10, 15, 25, 50];
  @Input() selected = this.entriesPerPage[0];
  @Output() ngModelChange = new EventEmitter<number>();

  constructor() {}
}
