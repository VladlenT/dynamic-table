import { TestBed } from '@angular/core/testing';

import { TableService } from './table.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DataService', () => {
  let service: TableService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(TableService);
    httpController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET data from a provided link', () => {
    const testUrl = '/test-url/123';

    service.getJSON(testUrl).subscribe(() => {});

    const req = httpController.expectOne(testUrl);

    expect(req.request.method).toEqual('GET');
  });

  it('should GET data from a local JSON when no link provided', () => {
    service.getJSON().subscribe(() => {});

    const req = httpController.expectOne('assets/data.json');

    expect(req.request.method).toEqual('GET');
  });
});
