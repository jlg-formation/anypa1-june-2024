import { Component, OnInit } from '@angular/core';
import { lastValueFrom, timer } from 'rxjs';

import { Article } from '@gestionstock/common';
import { ArticleService } from 'src/app/stock/services/article.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  displayedColumns = ['name', 'price', 'qty'];
  errorMsg = '';
  isRefreshing = false;
  isRemoving = false;
  selectedArticles = new Set<Article>();

  constructor(public articleService: ArticleService) {}

  ngOnInit(): void {
    if (this.articleService.articles === undefined) {
      (async () => {
        await lastValueFrom(timer(1000));
        console.log('timer finished');

        await this.articleService.load();
        console.log('this.articleService: ', this.articleService);
        console.log('ngOnInit done');
      })();
    }
  }

  async refresh() {
    try {
      this.errorMsg = '';
      this.isRefreshing = true;
      await lastValueFrom(timer(1000));
      await this.articleService.load();
    } catch (err) {
      console.log('err: ', err);
    } finally {
      this.isRefreshing = false;
    }
  }

  async remove() {
    try {
      this.errorMsg = '';
      this.isRemoving = true;
      const ids = [...this.selectedArticles].map((a) => a.id);
      await lastValueFrom(timer(1000));
      await this.articleService.remove(ids);
      await lastValueFrom(timer(1000));
      await this.articleService.load();
      this.selectedArticles.clear();
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Cannot suppress';
    } finally {
      this.isRemoving = false;
    }
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
