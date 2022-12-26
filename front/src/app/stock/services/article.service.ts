import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, lastValueFrom, switchMap, timer } from 'rxjs';
import { Article, NewArticle } from '../../interfaces/article';

const url = '/api/articles';

@Injectable()
export class ArticleService {
  articles: Article[] | undefined;
  errorMsg = '';

  constructor(private http: HttpClient) {}

  async add(newArticle: NewArticle) {
    await lastValueFrom(
      this.http.post<void>(url, newArticle).pipe(
        catchError((err) => {
          console.log('err: ', err);
          throw new Error('Technical error');
        })
      )
    );
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

  async remove(ids: string[]) {
    await lastValueFrom(
      timer(1000).pipe(
        switchMap(() =>
          this.http.delete<void>(url, {
            body: ids,
          })
        ),
        catchError((err) => {
          console.log('err: ', err);
          throw new Error('Technical error');
        })
      )
    );
  }
}
