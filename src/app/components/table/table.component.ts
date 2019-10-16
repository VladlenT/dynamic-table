import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SortParams } from '@app/interfaces/sort-params';
import { sortStrings } from '@app/utils/sortStrings';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectTableBody, selectTableHead } from '@store/selectors/table.selectors';
import { Observable } from 'rxjs';
import { AppState } from '@store/reducers';
import { selectRoutePage } from '@store/selectors/router.selectors';

// TODO: Add Effect to load first page after JSON load

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  tableHeader$: Observable<string[]>;
  currentPage: number;
  tableBody: any[];

  filteredTableBody = [];
  selectedEntries = 5;

  searchTerm: string;

  sort: SortParams = {
    field: null,
    orderAsc: true,
    index: 0,
  };

  get itemsStart(): number {
    return this.selectedEntries * (this.currentPage - 1);
  }

  get itemsEnd(): number {
    if (this.filteredTableBody) {
      return Math.min(this.itemsStart + this.selectedEntries, this.filteredTableBody.length);
    }
  }

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.tableHeader$ = this.store.select(selectTableHead);

    this.store.select(selectTableBody).subscribe(tbody => {
      this.tableBody = tbody;
      this.filteredTableBody = tbody;
    });
    this.store.select(selectRoutePage).subscribe(page => (this.currentPage = +page));
  }

  sortTable(field: string, index: number, saveOrder?: boolean) {
    const prepareString = (str: string) => str.toString().toLowerCase();

    if (!saveOrder) {
      this.sort.orderAsc = this.sort.field === field ? !this.sort.orderAsc : true;
    }

    this.sort.field = field;
    this.sort.index = index;

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
      this.filteredTableBody = this.tableBody.slice();
      return this.sortTable(this.sort.field, this.sort.index, true);
    }
    const regex = new RegExp(this.searchTerm, 'gi');

    this.filteredTableBody = this.tableBody.filter(row => row.some(e => regex.test(e.toString())));
    this.sortTable(this.sort.field, this.sort.index, true);
  }
}
