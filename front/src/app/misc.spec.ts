import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { backEndValidator } from './misc';

const url = '/api/test';

describe('BackEndValidator', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should test the back-end validator', fakeAsync(() => {
    const fctrl = new FormControl(
      'truc',
      [],
      [backEndValidator(url, httpClient)]
    );
    tick(3000);
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush({ result: true, message: 'hello' });
    tick();
    expect(fctrl.valid).toEqual(true);
  }));

  it('should test the back-end validator (negative)', fakeAsync(() => {
    const fctrl = new FormControl(
      'truc',
      [],
      [backEndValidator(url, httpClient)]
    );
    tick(3000);
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush({ result: false, message: 'hello' });
    tick();
    expect(fctrl.valid).toEqual(false);
  }));

  it('should test the back-end validator with error', fakeAsync(() => {
    const fctrl = new FormControl(
      'truc',
      [],
      [backEndValidator(url, httpClient)]
    );
    tick(3000);
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(null, { status: 500, statusText: 'Internal Error' });
    tick();
    expect(fctrl.valid).toEqual(true);
  }));
});
