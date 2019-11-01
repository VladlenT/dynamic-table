import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { tableActions } from '@store/table';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let nativeEl: HTMLElement;
  let store: MockStore<any>;
  let dispatchSpy;

  let input: HTMLInputElement;
  let btn: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    nativeEl = fixture.nativeElement;

    fixture.detectChanges();

    input = nativeEl.querySelector('#json-input');
    btn = nativeEl.querySelector('button');
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should OnInit dispatch an action to load JSON', () => {
    dispatchSpy = spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(tableActions.loadJSON({}));
  });

  it('should dispatch an action to load JSON with provided when calling getJSON()', () => {
    const testLink = '/link';
    dispatchSpy = spyOn(store, 'dispatch');

    component.getJSON(testLink);

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(tableActions.loadJSON({ link: testLink }));
  });

  it('should contain label with text', () => {
    const label: HTMLLabelElement = nativeEl.querySelector('label');
    expect(label.textContent).toContain('Insert link to JSON:');
  });

  it(`should dispatch an action if input value isn't empty when button is clicked`, () => {
    const testLink = '/test/link';
    dispatchSpy = spyOn(store, 'dispatch');

    input.value = testLink;
    btn.click();

    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(tableActions.loadJSON({ link: testLink }));
  });

  it(`shouldn't dispatch an action if input value is empty and button is clicked`, () => {
    dispatchSpy = spyOn(store, 'dispatch');

    input.value = '     ';
    btn.click();

    expect(dispatchSpy).not.toHaveBeenCalled();
  });
});
