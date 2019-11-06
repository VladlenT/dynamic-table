import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let nativeEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'page/:page',
            component: PaginationComponent,
          },
        ]),
      ],
      declarations: [PaginationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);

    component = fixture.componentInstance;
    nativeEl = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default values', () => {
    const { itemsTotal, currentPage, href, itemsPerPage } = component;

    expect(itemsTotal).toEqual(1);
    expect(currentPage).toEqual(1);
    expect(href).toEqual('/');
    expect(itemsPerPage).toEqual(1);
  });

  describe('pagesTotal()', () => {
    it('should calculate total amount of pages rounded up', () => {
      const expected = Math.ceil(123 / 10);

      component.itemsTotal = 123;
      component.itemsPerPage = 10;
      expect(component.pagesTotal).toEqual(expected);
    });
  });

  describe('pages()', () => {
    it('should have length equal to pagesTotal', () => {
      const expected = Math.ceil(223 / 20);

      component.itemsTotal = 223;
      component.itemsPerPage = 20;
      expect(component.pages.length).toEqual(expected);
    });

    it('should build an array of number from 1 to last page', () => {
      const expected = [1, 2, 3, 4, 5];

      component.itemsTotal = 74;
      component.itemsPerPage = 15;
      expect(component.pages).toEqual(expected);
    });
  });
});
