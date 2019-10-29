import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SortParams } from '@app/interfaces/sort-params';
import { sortStrings } from '@app/utils/sortStrings/sortStrings';
import { Store } from '@ngrx/store';
import { selectTableBody, selectTableHead } from '@store/table/table.selectors';
import { AppState } from '@app/store';
import { selectRoutePage } from '@store/router/router.selectors';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  tableHeader$ = this.store.select(selectTableHead);
  tableBody = [];
  filteredTableBody = [];
  currentPage = 1;
  searchTerm = '';
  selectedEntries = 5;

  sort: SortParams = {
    field: null,
    orderAsc: true,
    index: 0,
  };
  get itemsStart(): number {
    if (this.filteredTableBody) {
      return Math.min(this.selectedEntries * (this.currentPage - 1), this.filteredTableBody.length);
    } else {
      return 0;
    }
  }

  get itemsEnd(): number {
    if (this.filteredTableBody) {
      return Math.min(this.itemsStart + this.selectedEntries, this.filteredTableBody.length);
    } else {
      return this.itemsStart;
    }
  }

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.select(selectTableBody).subscribe(tbody => {
      if (tbody) {
        this.tableBody = tbody;
        this.filteredTableBody = tbody;
      }
    });
    this.store.select(selectRoutePage).subscribe(page => (this.currentPage = +page));
  }

  sortTable(field: string, index: number, preserveOrder?: boolean): void {
    const prepareValue = (value: any) => value.toString().toLowerCase();

    if (!preserveOrder) {
      this.sort.orderAsc = this.sort.field !== field;
    }

    this.sort = { ...this.sort, field, index };

    this.filteredTableBody = this.filteredTableBody.sort((rowA, rowB) => {
      const a = prepareValue(rowA[index]);
      const b = prepareValue(rowB[index]);

      return this.sort.orderAsc ? sortStrings(a, b) : sortStrings(b, a);
    });
  }

  saveUserEdit(data: string, row: number, col: number): void {
    this.tableBody[row][col] = data;
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.filteredTableBody = this.tableBody.slice();
      return this.sortTable(this.sort.field, this.sort.index, true);
    }
    const regex = new RegExp(this.searchTerm, 'gi');

    this.filteredTableBody = this.tableBody.filter(row => row.some(e => regex.test(e.toString())));

    this.sortTable(this.sort.field, this.sort.index, true);
  }
}
