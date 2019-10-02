import { Component, OnInit } from '@angular/core';
import { TableService } from '../services/table.service';
import { SortParams } from '../interfaces/sort-params';
import { sortStrings } from '../utils/sortStrings';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  tableHeader: Array<string | number> = [];
  tableBody: Array<Array<any>> = [];
  filteredTableBody: Array<Array<any>> = [];

  searchTerm: string;

  sort: SortParams = {
    field: null,
    orderAsc: true,
  };

  params: Params;

  get itemsStart() {
    return this.tableService.selectedEntries * (this.params.page - 1);
  }

  get itemsEnd() {
    return Math.min(
      this.itemsStart + this.tableService.selectedEntries,
      this.filteredTableBody.length,
    );
  }

  constructor(
    private router: Router,
    public tableService: TableService,
    public route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getJsonData();
    this.setParams();
  }

  getJsonData() {
    this.tableService.getTableData().subscribe(
      (data: Array<object>) => {
        this.tableHeader = Object.keys(data[0]);
        this.tableBody = data.map(e => Object.values(e));
        this.filteredTableBody = this.tableBody;
        this.router.navigateByUrl('/page/1');
      },
      error => console.log('error >>>>', error),
    );
  }

  setParams() {
    this.route.params.subscribe(
      params => (this.params = params),
      e => {
        throw e;
      },
    );
  }

  sortTable(field: string, index: number) {
    this.sort.orderAsc = this.sort.field === field ? !this.sort.orderAsc : true;

    this.sort.field = field;

    this.filteredTableBody = this.filteredTableBody.sort((rowA, rowB) => {
      const a = rowA[index].toString().toLowerCase();
      const b = rowB[index].toString().toLowerCase();

      return this.sort.orderAsc ? sortStrings(a, b) : sortStrings(b, a);
    });
  }

  saveUserEdit(data: string, rowIndex: number, colIndex: number) {
    this.tableBody[rowIndex][colIndex] = data;
  }

  search() {
    if (!this.searchTerm) {
      return (this.filteredTableBody = this.tableBody.slice());
    }

    const regex = new RegExp(this.searchTerm, 'gi');

    this.filteredTableBody = this.tableBody
      .filter(row => row.some(e => regex.test(e.toString())))
      .map(row => row.map(e => e.toString().replace(regex, val => '<mark>' + val + '</mark>')));
  }
}
