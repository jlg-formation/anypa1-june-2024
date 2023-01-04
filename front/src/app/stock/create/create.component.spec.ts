/* eslint-disable @typescript-eslint/no-empty-function */
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgZone } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TestScheduler } from 'rxjs/testing';
import { NewArticle } from 'src/app/interfaces/article';
import { ArticleService } from '../services/article.service';
import { StockModule } from '../stock.module';
import { articleNameUrl, CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let testScheduler: TestScheduler;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StockModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: ArticleService,
          useValue: {
            async load() {},
            async add(newArticle: NewArticle) {
              if (newArticle.name === 'bad') {
                throw new Error('bad is forbidden');
              }
            },
            async remove() {},
          },
        },
      ],
      declarations: [CreateComponent],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    ngZone = TestBed.inject(NgZone);
  });

  beforeEach(() => {
    testScheduler.run(() => {
      fixture = TestBed.createComponent(CreateComponent);
      const req = httpTestingController.expectOne(articleNameUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(['Tournevis', 'Perceuse']);

      component = fixture.componentInstance;
      component.f.controls.name.clearAsyncValidators();
      fixture.detectChanges();

      // '|' means observable completes
      testScheduler.createTime('|');
      testScheduler.flush();
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should autocomplete', fakeAsync(() => {
    // write Tour and the autocomplete should answer ['Tournevis']
    component.f.controls.name.clearAsyncValidators();
    component.f.controls.name.updateValueAndValidity();
    component.filteredOptions$.subscribe((opts) => {
      console.log('opts: ', opts);
      expect(opts).toEqual(['Tournevis']);
    });
    component.f.controls.name.setValue('Tour');
    tick(1000);
  }));

  it('should insure the quantity is an integer', () => {
    component.f.controls.qty.setValue(3.24);
    expect(component.f.controls.qty.value).toEqual(3);
  });

  it('should submit', fakeAsync(() => {
    // ngZone is necessary to avoid a warning message with the router.
    ngZone.run(() => {
      component.submit().catch((err) => {
        console.log('test err: ', err);
        fail('should not go in error');
      });
      tick(2000);
    });
  }));

  it('should submit in error', fakeAsync(() => {
    component.f.controls.name.setValue('bad');
    component
      .submit()
      .then(() => {
        console.log('submitted');
      })
      .catch((err) => {
        console.log('test err: ', err);
        fail('should not go in error');
      });
    tick(2000);
    expect(component.errorMsg).toEqual('bad is forbidden');
  }));
});
