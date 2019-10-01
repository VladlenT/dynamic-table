import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(public tableService: TableService) {}

  ngOnInit() {
    this.tableService.getJsonData().subscribe(
      (data: Array<object>) => {
        this.tableService.tableHeader = Object.keys(data[0]);
        this.tableService.tableBody = data.map(e => Object.values(e));
      },
      error => console.log('error >>>>', error),
    );
  }
}
