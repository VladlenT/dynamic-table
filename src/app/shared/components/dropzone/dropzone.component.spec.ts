import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneComponent } from './dropzone.component';

describe('DropzoneComponent', () => {
  let component: DropzoneComponent;
  let fixture: ComponentFixture<DropzoneComponent>;
  let nativeEl: HTMLElement;
  let uploadInput: HTMLInputElement;
  let dropzone: HTMLElement;

  const testObj = { test: 'JSON' };
  const blob = new Blob([JSON.stringify(testObj)]);
  const file = new File([blob], 'test.json', { type: 'application/json' });
  const fileList = new DataTransfer();

  fileList.items.add(file);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropzoneComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropzoneComponent);

    component = fixture.componentInstance;
    nativeEl = fixture.debugElement.nativeElement;

    uploadInput = nativeEl.querySelector('#json-upload') as HTMLInputElement;
    dropzone = nativeEl.querySelector('.dropzone');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have label with some text', () => {
    const label = nativeEl.querySelector('label') as HTMLLabelElement;
    expect(label.textContent.length).toBeGreaterThan(0);
  });

  it('should emit file uploaded through input', async(() => {
    component.fileDrop.subscribe(file => expect(file).toEqual(file));

    uploadInput.files = fileList.files;
    uploadInput.dispatchEvent(new Event('change'));

    fixture.detectChanges();
  }));

  it(`should emit file uploaded through drag'n'drop`, async(() => {
    component.fileDrop.subscribe(file => expect(file).toEqual(file));

    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer: fileList }));

    fixture.detectChanges();
  }));

  it(`should add 'dropzone--hover' class on hover`, () => {
    dropzone.dispatchEvent(new DragEvent('dragenter'));

    fixture.detectChanges();

    expect(dropzone.classList).toContain('dropzone--hover');
  });

  it(`should'nt have dropzone--hover class after drop event `, () => {
    dropzone.dispatchEvent(new DragEvent('dragenter'));

    fixture.detectChanges();

    dropzone.dispatchEvent(new DragEvent('drop', { dataTransfer: fileList }));

    fixture.detectChanges();
    expect(dropzone.classList).not.toContain('dropzone--hover');
  });
});
