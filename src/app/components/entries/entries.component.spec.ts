import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesComponent } from './entries.component';
import { SharedModule } from '@shared/shared.module';
import { getRandomNumberInRange } from '@app/utils/getRandomNumberInRange';

describe('EntriesComponent', () => {
  let component: EntriesComponent;
  let fixture: ComponentFixture<EntriesComponent>;
  let nativeEl: HTMLElement;
  let options: NodeListOf<HTMLOptionElement>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [EntriesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;

    fixture.detectChanges();

    options = nativeEl.querySelectorAll('option');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a select with options', () => {
    expect(options.length).toEqual(component.entriesPerPage.length);
  });

  it('should have default input values', () => {
    expect(component.entriesPerPage.length).toBeGreaterThan(0, 'entries array is not defined');
    expect(component.selected).toBeDefined('selected value is not defined');
  });

  it('should raise ngModelChange event when selecting an option', async(() => {
    const select = nativeEl.querySelector('select');
    const randomIndex = getRandomNumberInRange(0, options.length - 1);

    component.selectedChange.subscribe(value => {
      expect(value).toEqual(component.selected, 'wrong ngModel value');
    });

    select.value = options[randomIndex].value;
    select.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.entriesPerPage[randomIndex]).toEqual(component.selected);
  }));
});
