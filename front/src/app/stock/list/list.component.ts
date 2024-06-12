import { ChangeDetectorRef, Component, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleNotch,
  faPlus,
  faRotateRight,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Article } from '../interfaces/article';
import { ArticleService } from '../services/article.service';
import {
  Observable,
  catchError,
  finalize,
  lastValueFrom,
  of,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
})
export default class ListComponent implements OnInit {
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  faRotateRight = faRotateRight;
  faTrashAlt = faTrashAlt;
  isRefreshing = false;
  selectedArticles = new Set<Article>();
  isRemoving = false;
  errorMsg = '';

  getTotalArticles = computed(() => {
    const articles = this.articleService.articles();
    if (articles === undefined) {
      return 0;
    }
    return articles.length;
  });

  constructor(
    public articleService: ArticleService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.articleService.articles() === undefined) {
      this.articleService
        .load()
        .pipe(
          tap(() => {
            this.cd.markForCheck();
          })
        )
        .subscribe();
    }
  }

  refresh(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';
        this.isRefreshing = true;
        return this.articleService.load();
      }),
      catchError((err) => {
        console.log('err: ', err);
        return of(undefined);
      }),
      finalize(() => {
        this.isRefreshing = false;
        this.cd.markForCheck();
      })
    );
  }

  remove(): Observable<void> {
    return of(undefined).pipe(
      switchMap(() => {
        this.errorMsg = '';
        this.isRemoving = true;
        const ids = [...this.selectedArticles].map((a) => a.id);
        return this.articleService.remove(ids);
      }),
      switchMap(() => {
        return this.articleService.load();
      }),
      tap(() => {
        this.selectedArticles.clear();
      }),
      catchError((err) => {
        console.log('err: ', err);
        this.errorMsg = 'Cannot suppress';
        return of(undefined);
      }),
      finalize(() => {
        this.isRemoving = false;
        this.cd.markForCheck();
      })
    );
  }

  select(a: Article) {
    if (this.selectedArticles.has(a)) {
      this.selectedArticles.delete(a);
      return;
    }
    this.selectedArticles.add(a);
  }
}
