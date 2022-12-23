import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ArticleService } from './services/article.service';
import { StockRoutingModule } from './stock-routing.module';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  providers: [ArticleService],
  imports: [
    CommonModule,
    StockRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
})
export class StockModule {}
