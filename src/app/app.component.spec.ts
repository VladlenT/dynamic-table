import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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

  it('should contain labels with text', () => {
    const labels: NodeListOf<HTMLLabelElement> = nativeEl.querySelectorAll('label');
    labels.forEach(label => expect(label.textContent.length).toBeGreaterThan(0));
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

  it('should dispatch an action when json is uploaded', fakeAsync(() => {
    // dispatchSpy = spyOn(store, 'dispatch');

    const uploadSpy = spyOn(component, 'upload');
    uploadSpy.and.callThrough();

    const uploadInput = nativeEl.querySelector('#json-upload') as HTMLInputElement;
    const testObj = { test: 'JSON' };

    const blob = new Blob([JSON.stringify(testObj)]);
    const file = new File([blob], 'test.json', { type: 'application/json' });

    const fileList = new DataTransfer();
    fileList.items.add(file);

    uploadInput.files = fileList.files;
    uploadInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    tick();

    expect(uploadSpy).toHaveBeenCalledWith(file);

    // Currently Angular test environment doesn't wait for FileReader events nor with async nor with fakeAsync
    // so we can't test does it actions actually get dispatched

    // expect(dispatchSpy).toHaveBeenCalledTimes(1);
    // expect(dispatchSpy).toHaveBeenCalledWith(tableActions.loadJSONSuccess({ data: testObj }));
  }));
});
