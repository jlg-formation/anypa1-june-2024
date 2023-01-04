/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ArticleService } from '../services/article.service';
import { StockModule } from '../stock.module';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  beforeEach(async () => {
    articleServiceSpy = jasmine.createSpyObj('articleService', [
      'load',
      'remove',
    ]);
    articleServiceSpy.load.and.callFake(async () => {
      console.log('fake load');
    });
    articleServiceSpy.remove.and.callFake(async () => {
      console.log('fake remove');
    });
    await TestBed.configureTestingModule({
      imports: [StockModule, RouterTestingModule],
      providers: [{ provide: ArticleService, useValue: articleServiceSpy }],
      declarations: [ListComponent],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    // this will play ngOnInit
    fixture.detectChanges();
    // this will wait for timer to finish
    tick(2000);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(articleServiceSpy.load).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
  });

  it('should refresh', fakeAsync(() => {
    component.refresh().catch((err) => {
      fail('Should not go here: ' + err);
    });
    tick(2000);
    fixture.detectChanges();
    expect(articleServiceSpy.load).toHaveBeenCalledTimes(2);
  }));

  it('should refresh in error', fakeAsync(() => {
    articleServiceSpy.load.and.callFake(async () => {
      console.log('fake load in error');
      throw new Error('oups...');
    });
    component.refresh().catch((err) => {
      fail('Should not go here: ' + err);
    });
    tick(2000);
    fixture.detectChanges();
    expect(articleServiceSpy.load).toHaveBeenCalledTimes(2);
  }));

  it('should remove', fakeAsync(() => {
    component.remove().catch((err) => {
      fail('Should not go here: ' + err);
    });
    tick(2000);
    fixture.detectChanges();
    expect(articleServiceSpy.load).toHaveBeenCalledTimes(2);
  }));

  it('should remove in error', fakeAsync(() => {
    articleServiceSpy.load.and.callFake(async () => {
      console.log('fake load in error');
      throw new Error('oups...');
    });
    component.remove().catch((err) => {
      fail('Should not go here: ' + err);
    });
    tick(2000);
    fixture.detectChanges();
    expect(articleServiceSpy.load).toHaveBeenCalledTimes(2);
  }));
});
