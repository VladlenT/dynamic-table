import { Component, OnInit, SecurityContext } from '@angular/core';
import { TableService } from '../services/table.service';
import { SortParams } from '../interfaces/sort-params';
import { sortStrings } from '../utils/sortStrings';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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

  routeParams: Params;

  get itemsStart() {
    return this.tableService.selectedEntries * (this.routeParams.page - 1);
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
    this.fetchJsonData();
    this.setParams();
  }

  fetchJsonData() {
    this.tableService
      .getTableData()
      .subscribe(
        (data: Array<object>) => {
          this.tableHeader = Object.keys(data[0]);
          this.tableBody = data.map(e => Object.values(e));
          this.filteredTableBody = this.tableBody;
        },
        error => console.log('error >>>>', error),
      )
      .add(() => this.router.navigateByUrl('/page/1'));
  }

  setParams() {
    this.route.params.subscribe(
      params => (this.routeParams = params),
      e => {
        throw e;
      },
    );
  }

  sortTable(field: string, index: number) {
    const prepareString = (str: string) => str.toString().toLowerCase();

    this.sort.orderAsc = this.sort.field === field ? !this.sort.orderAsc : true;

    this.sort.field = field;

    this.filteredTableBody = this.filteredTableBody.sort((rowA, rowB) => {
      const a = prepareString(rowA[index]);
      const b = prepareString(rowB[index]);

      return this.sort.orderAsc ? sortStrings(a, b) : sortStrings(b, a);
    });
  }

  saveUserEdit(data: string, row: number, col: number) {
    this.filteredTableBody[row][col] = data;
  }

  search() {
    if (!this.searchTerm.trim()) {
      return (this.filteredTableBody = this.tableBody.slice());
    }
    const regex = new RegExp(this.searchTerm, 'gi');

    this.filteredTableBody = this.tableBody.filter(row => row.some(e => regex.test(e.toString())));
  }
}
