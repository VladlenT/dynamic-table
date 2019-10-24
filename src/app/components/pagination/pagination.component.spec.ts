import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    component.itemsTotal = 5;

    fixture.detectChanges();

    const links = fixture.debugElement.queryAll(By.directive(RouterLink));

    console.log('link >>>>', links[1]);

    expect(component).toBeTruthy();
  });
});
