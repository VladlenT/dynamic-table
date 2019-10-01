import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';
import { SortParams } from '../interfaces/sort-params';
import { sortStrings } from '../utits/sortStrings';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  tableHeader: Array<string | number> = [];
  tableBody: Array<Array<object>> = [];
  sort: SortParams = {
    field: null,
    orderAsc: false,
  };

  constructor(public tableService: TableService) {}

  ngOnInit() {
    this.tableService.getJsonData().subscribe(
      (data: Array<object>) => {
        this.tableHeader = Object.keys(data[0]);
        this.tableBody = data.map(e => Object.values(e));
      },
      error => console.log('error >>>>', error),
    );
  }

  sortTable(event) {
    const currentSortingField = event.target.textContent;
    const index = this.tableHeader.indexOf(currentSortingField);

    const order =
      this.sort.field === currentSortingField ? (this.sort.orderAsc = !this.sort.orderAsc) : true;

    this.sort.field = currentSortingField;

    this.tableBody = this.tableBody.sort((rowA, rowB) => {
      const a = rowA[index].toString().toLowerCase();
      const b = rowB[index].toString().toLowerCase();

      return order ? sortStrings(a, b) : sortStrings(b, a);
    });
  }
}
