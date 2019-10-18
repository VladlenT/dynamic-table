import { TestBed } from '@angular/core/testing';

import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(TestService);
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
});
