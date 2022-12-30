import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  delay,
  lastValueFrom,
  map,
  Observable,
  ReplaySubject,
  switchMap,
  timer,
} from 'rxjs';
import { NewArticle } from 'src/app/interfaces/article';
import { backEndValidator } from 'src/app/misc';
import { ArticleService } from 'src/app/stock/services/article.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  errorMsg = '';
  f = this.fb.nonNullable.group({
    name: [
      'Truc',
      [Validators.required, Validators.minLength(3)],
      [backEndValidator('/api/forbiddenValues', this.http)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    qty: [1, [Validators.required, Validators.min(0)]],
  });
  filteredOptions: Observable<string[]>;
  isAdding = false;
  options$ = new ReplaySubject<string[]>(1);

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.http
      .get<string[]>('/api/options/articleNames')
      .pipe(delay(2000))
      .subscribe((opts) => this.options$.next(opts));
    this.filteredOptions = this.f.controls.name.valueChanges.pipe(
      switchMap((name) => {
        console.log('name: ', name);
        return this.options$.pipe(
          map((opts) =>
            opts.filter((opt) => opt.toLowerCase().includes(name.toLowerCase()))
          )
        );
      })
    );
  }

  async submit() {
    try {
      this.isAdding = true;
      await lastValueFrom(timer(1000));
      await this.articleService.add(this.f.value as NewArticle);
      await this.articleService.load();
      await this.router.navigate(['..'], { relativeTo: this.route });
    } catch (err) {
      console.log('err: ', err);
      if (err instanceof Error) {
        this.errorMsg = err.message;
      }
    } finally {
      this.isAdding = false;
    }
  }
}
