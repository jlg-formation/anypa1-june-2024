import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { delay } from 'rxjs';

const url = environment.apiDomain + '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] | undefined;
  errorMsg = '';

  constructor(private http: HttpClient) {}

  async add(newArticle: NewArticle) {
    throw new Error('Method not implemented.');
  }

  async load() {
    try {
      this.errorMsg = '';
      await this.http
        .get<Article[]>(url)
        .pipe(delay(1000))
        .forEach((articles) => {
          this.articles = articles;
        });
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Technical Error';
    }
  }
}
