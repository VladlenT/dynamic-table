import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';
import { SortParams } from '../interfaces/sort-params';
import { sortStrings } from '../utils/sortStrings';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

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
    orderAsc: true,
  };

  constructor(public tableService: TableService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.tableService.getJsonData().subscribe(
      (data: Array<object>) => {
        this.tableHeader = Object.keys(data[0]);
        this.tableBody = data.map(e => Object.values(e));
      },
      error => console.log('error >>>>', error),
    );
  }

  sortTable(field: string, index: number) {
    this.sort.orderAsc = this.sort.field === field ? !this.sort.orderAsc : true;

    this.sort.field = field;

    this.tableBody = this.tableBody.sort((rowA, rowB) => {
      const a = rowA[index].toString().toLowerCase();
      const b = rowB[index].toString().toLowerCase();

      return this.sort.orderAsc ? sortStrings(a, b) : sortStrings(b, a);
    });
  }
}
