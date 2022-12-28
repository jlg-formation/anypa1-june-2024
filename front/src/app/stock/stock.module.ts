import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import {
  MatTooltipDefaultOptions,
  MatTooltipModule,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
} from '@angular/material/tooltip';

import { CreateComponent } from './create/create.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { ListComponent } from './list/list.component';
import { ArticleService } from './services/article.service';
import { StockRoutingModule } from './stock-routing.module';

console.log('MAT_TOOLTIP_DEFAULT_OPTIONS: ', MAT_TOOLTIP_DEFAULT_OPTIONS);

const matTooltipDefaultOptions: MatTooltipDefaultOptions = {
  position: 'above',
  hideDelay: 0,
  showDelay: 300,
  touchendHideDelay: 1000,
};

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
    {
      provide: MAT_TOOLTIP_DEFAULT_OPTIONS,
      useValue: matTooltipDefaultOptions,
    },
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
  ],
})
export class StockModule {}
