import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CreateComponent } from './create/create.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { ListComponent } from './list/list.component';
import { ArticleService } from './services/article.service';
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  providers: [
    ArticleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    },
    HttpClient,
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class StockModule {}
