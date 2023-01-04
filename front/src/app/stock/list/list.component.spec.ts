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
    articleServiceSpy = jasmine.createSpyObj('articleService', ['load']);
    articleServiceSpy.load.and.callFake(async () => {
      console.log('fake load');
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
    console.log('complete');
  }));

  it('should create', fakeAsync(() => {
    expect(articleServiceSpy.load).toHaveBeenCalledTimes(1);
    expect(component).toBeTruthy();
  }));
});
