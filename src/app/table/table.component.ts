import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  tableHeader: Array<string | number>;
  tableBody: Array<Array<object>>;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getJsonData().subscribe((data: Array<object>) => {
      this.tableHeader = Object.keys(data[0]);
      this.tableBody = data.map(e => Object.values(e));
    });
  }
}
