import { Component, OnInit } from '@angular/core';
import { TableService } from './services/table.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService.getJSON();
  }

  submit(value: string) {
    this.tableService.getJSON(value);
  }
}
