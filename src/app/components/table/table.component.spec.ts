import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { SharedModule } from '@shared/shared.module';
import { PaginationComponent } from '@/pagination/pagination.component';
import { EntriesComponent } from '@/entries/entries.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore } from '@ngrx/store/testing';
import { Store, StoreModule } from '@ngrx/store';
import * as fromTable from '@store/table';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let store: MockStore<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        StoreModule.forRoot({ table: fromTable.reducer }),
      ],
      declarations: [TableComponent, PaginationComponent, EntriesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(TableComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
