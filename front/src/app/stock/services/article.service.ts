import { Injectable } from '@angular/core';
import { Article, NewArticle } from '../interfaces/article';
import { HttpClient } from '@angular/common/http';
import {
  delay,
  lastValueFrom,
  catchError,
  switchMap,
  timer,
  Observable,
  of,
} from 'rxjs';

const url = '/api/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] | undefined;
  errorMsg = '';

  constructor(private http: HttpClient) {}

  add(newArticle: NewArticle): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => this.http.post<void>(url, newArticle)),
      catchError((err) => {
        console.log('err: ', err);
        throw new Error('Technical error');
      })
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
