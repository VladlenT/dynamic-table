import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';

describe('TestService', () => {
  let service: TestService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(TestService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return "test"', (done: DoneFn) => {
    service.testFn().subscribe(value => {
      expect(value).toBe('test');
      done();
    });
  });

  it('should test a request', () => {
    const testData = { hello: 'world' };

    service.testRequest().subscribe(res => {
      expect(res).toEqual(testData);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos/1');

    expect(req.request.method).toEqual('GET');

    req.flush(testData);
  });

  it('should handle errors', () => {
    const errorMsg = '404 error';

    service.testRequest().subscribe(
      () => fail('should have failed with the 404 error'),
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404, 'status');
        expect(error.error).toEqual(errorMsg, 'errorMsg');
      },
    );

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/todos/1');

    req.flush(errorMsg, { status: 404, statusText: 'Not Found' });
  });
});
