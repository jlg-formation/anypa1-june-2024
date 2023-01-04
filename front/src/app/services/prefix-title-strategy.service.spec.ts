import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { Router, Routes, TitleStrategy } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PrefixTitleStrategyService } from './prefix-title-strategy.service';

@Component({
  template: `Search`,
})
export class SearchComponent {}

@Component({
  template: `Home`,
})
export class HomeComponent {}

@Component({
  template: '<router-outlet></router-outlet>' + '',
})
export class AppComponent {}

describe('PrefixTitleStrategyService', () => {
  let service: PrefixTitleStrategyService;
  let router: Router;
  let location: Location;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let title: Title;

  it('should be a simple title', fakeAsync(() => {
    const routes: Routes = [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
    ];

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HomeComponent, AppComponent, SearchComponent],
      providers: [
        {
          provide: TitleStrategy,
          useClass: PrefixTitleStrategyService,
        },
      ],
    });
    service = TestBed.inject(PrefixTitleStrategyService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    title = TestBed.inject(Title);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router.initialNavigation();
    tick();
    fixture.detectChanges();

    expect(service).toBeTruthy();
    expect(location).toBeTruthy();
    expect(component).toBeTruthy();
    expect(title.getTitle()).toBe('Gestion Stock');
  }));
  it('should be a complex title', fakeAsync(() => {
    const routes: Routes = [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'search', component: SearchComponent },
    ];

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HomeComponent, AppComponent, SearchComponent],
      providers: [
        {
          provide: TitleStrategy,
          useClass: PrefixTitleStrategyService,
        },
      ],
    });
    service = TestBed.inject(PrefixTitleStrategyService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    title = TestBed.inject(Title);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router.initialNavigation();
    tick();
    fixture.detectChanges();

    expect(service).toBeTruthy();
    expect(location).toBeTruthy();
    expect(component).toBeTruthy();
    expect(title.getTitle()).toBe('Gestion Stock : Home');
  }));
});
