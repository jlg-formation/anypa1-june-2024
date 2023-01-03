import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { a3, articles } from 'src/app/test/articles.data';
import { StockModule } from '../stock.module';
import { ArticleService, url } from './article.service';

describe('ArticleService', () => {
  let httpTestingController: HttpTestingController;

  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StockModule, HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ArticleService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load', (done: DoneFn) => {
    service.load().then(() => {
      expect(service.articles).toEqual(articles);
      done();
    });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(articles);
  });

  it('should load with error', (done: DoneFn) => {
    service
      .load()
      .then(() => {
        expect(service.errorMsg).toEqual('Technical Error');
        done();
      })
      .catch(() => {
        fail('should not go in error');
      });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(null, { status: 500, statusText: 'Internal Error' });
  });

  it('should add', (done: DoneFn) => {
    service
      .add(a3)
      .then(() => {
        done();
      })
      .catch((err) => {
        throw new Error('should not get an error: ' + err);
      });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(null, { status: 201, statusText: 'Created' });
  });

  it('should add in error', (done: DoneFn) => {
    service
      .add(a3)
      .then(() => {
        fail('request must return an error');
      })
      .catch((err: Error) => {
        expect(err.message).toEqual('Technical Error');
        done();
      });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(null, { status: 400, statusText: 'Bad Request' });
  });

  it('should remove', (done: DoneFn) => {
    service
      .remove(['xxx'])
      .then(() => {
        console.log('removed');
        done();
      })
      .catch((err) => {
        throw new Error('should not get an error: ' + err);
      });
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  it('should remove in error', async () => {
    const call = service.remove(['xxx']);
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toEqual('DELETE');
    req.flush(null, { status: 500, statusText: 'Internal Error' });

    let error: Error | undefined;
    try {
      await call;
    } catch (err) {
      error = err as Error;
    }
    if (error === undefined) {
      fail('request must return an error');
      return;
    }
    expect(error.message).toEqual('Technical Error');
  });
});
