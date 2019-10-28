import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { Router } from '@angular/router';

import { TableComponent } from './table.component';
import { SharedModule } from '@shared/shared.module';
import { PaginationComponent } from '@/pagination/pagination.component';
import { EntriesComponent } from '@/entries/entries.component';
import { getRandomNumberInRange } from '@app/utils/getRandomNumberInRange';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let store: MockStore<any>;
  let nativeEl: HTMLElement;
  let router: Router;

  const initialState = {
    table: {
      initialJSON: [
        {
          prop1: 'val1',
          prop2: 'Val3',
        },
        {
          prop1: 'val1',
          prop2: 'val2',
        },
        {
          prop1: '333',
          prop2: '3  value 123',
        },
      ],
    },
    router: routerReducer,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([
          {
            path: 'page/:page',
            component: TableComponent,
          },
        ]),
      ],
      providers: [provideMockStore()],
      declarations: [TableComponent, PaginationComponent, EntriesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    router = TestBed.get(Router);
    fixture = TestBed.createComponent(TableComponent);

    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;

    store.setState(initialState);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ths amount equal to amount of json fields', () => {
    const headings = Object.keys(initialState.table.initialJSON[0]);

    let ths = nativeEl.querySelectorAll('th');

    expect(ths.length).toEqual(0, 'should be 0 ths on init');

    fixture.detectChanges();

    ths = nativeEl.querySelectorAll('th');

    expect(ths.length).toEqual(headings.length, 'wrong amount of ths');

    ths.forEach((th, i) =>
      expect(th.textContent).toMatch(headings[i], `th #${i} doesn't match heading text`),
    );
  });

  describe('itemsStart()', () => {
    it('should get() table starting index', async(() => {
      component.filteredTableBody = undefined;

      component.currentPage = 5;
      component.selectedEntries = 10;

      expect(component.itemsStart).toEqual(
        0,
        `starting index should'nt be bigger than table length`,
      );

      component.filteredTableBody = new Array(100).fill(0);

      expect(component.itemsStart).toEqual(40, 'wrong starting index');
    }));
  });

  describe('itemsEnd()', () => {
    it('should get() table ending index', () => {
      component.filteredTableBody = undefined;

      component.currentPage = 7;
      component.selectedEntries = 10;
      expect(component.itemsEnd).toEqual(
        component.itemsStart,
        `ending index should'nt be bigger than table length`,
      );

      component.filteredTableBody = new Array(100).fill(0);
      expect(component.itemsEnd).toEqual(70, 'wrong ending index');
    });
  });

  describe('saveUserEdit()', () => {
    it('should save value of edited table column', () => {
      const expectedText = 'Hello world. New text content';

      component.ngOnInit();
      fixture.detectChanges();

      component.currentPage = 1;

      const search = nativeEl.querySelector('#search') as HTMLInputElement;

      search.value = '3';
      search.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      const trs = nativeEl.querySelectorAll('tbody tr') as NodeListOf<HTMLTableRowElement>;
      const randomRowIndex = getRandomNumberInRange(0, trs.length - 1);
      const selectedRow = trs.item(randomRowIndex);
      const randomColIndex = getRandomNumberInRange(0, selectedRow.cells.length - 1);
      const selectedCol = selectedRow.cells.item(randomColIndex);

      selectedCol.textContent = expectedText;

      selectedCol.dispatchEvent(new Event('blur'));

      fixture.detectChanges();

      const rowInFilteredTableBody = component.filteredTableBody[randomRowIndex];

      // Last item in row contains index of the original row
      const originalRowIndex = rowInFilteredTableBody[rowInFilteredTableBody.length - 1];

      expect(rowInFilteredTableBody[randomColIndex]).toEqual(expectedText);
      expect(component.tableBody[originalRowIndex][randomColIndex]).toEqual(
        expectedText,
        `text in original table doesn't match expected text`,
      );
    });
  });
});
