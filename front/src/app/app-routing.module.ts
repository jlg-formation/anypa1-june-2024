import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  TitleStrategy,
} from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { LegalComponent } from './routes/legal/legal.component';
import { PrefixTitleStrategyService } from './services/prefix-title-strategy.service';

/* istanbul ignore next */
const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Accueil' },
  {
    path: 'legal',
    component: LegalComponent,
    title: $localize`Mentions Légales`,
  },
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule),
    title: $localize`Gestion Stock: Stock`,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [
    {
      provide: TitleStrategy,
      useClass: PrefixTitleStrategyService,
    },
  ],
})
export class AppRoutingModule {}
