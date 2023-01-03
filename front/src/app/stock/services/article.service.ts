import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, lastValueFrom } from 'rxjs';
import { Article, NewArticle } from '../../interfaces/article';

export const url = '/api/articles';

@Injectable()
export class ArticleService {
  articles: Article[] | undefined;
  errorMsg = '';

  constructor(private http: HttpClient) {}

  async add(newArticle: NewArticle) {
    await lastValueFrom(
      this.http.post<void>(url, newArticle).pipe(
        catchError((err) => {
          console.log('http post err: ', err);
          throw new Error('Technical Error');
        })
      )
    );
  }

  async load() {
    try {
      this.errorMsg = '';
      await this.http.get<Article[]>(url).forEach((articles) => {
        this.articles = articles;
      });
    } catch (err) {
      console.log('err: ', err);
      this.errorMsg = 'Technical Error';
    }
  }

  async remove(ids: string[]) {
    await lastValueFrom(
      this.http
        .delete<void>(url, {
          body: ids,
        })
        .pipe(
          catchError((err) => {
            console.log('err: ', err);
            throw new Error('Technical Error');
          })
        )
    );
  }
}
