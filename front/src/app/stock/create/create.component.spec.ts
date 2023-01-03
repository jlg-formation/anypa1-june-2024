import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TestScheduler } from 'rxjs/testing';
import { StockModule } from '../stock.module';
import { articleNameUrl, CreateComponent } from './create.component';

describe('CreateComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let testScheduler: TestScheduler;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StockModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      declarations: [CreateComponent],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  beforeEach((done: DoneFn) => {
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

      done();
    });
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should autocomplete', (done: DoneFn) => {
    // write Tour and the autocomplete should answer ['Tournevis']
    component.f.controls.name.clearAsyncValidators();
    component.f.controls.name.updateValueAndValidity();
    component.filteredOptions$.subscribe((opts) => {
      console.log('opts: ', opts);
      expect(opts).toEqual(['Tournevis']);
      done();
    });
    component.f.controls.name.setValue('Tour');

    expect(component).toBeTruthy();
  });
});
