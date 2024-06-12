import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleNotch, faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  Observable,
  catchError,
  delay,
  finalize,
  lastValueFrom,
  map,
  of,
  switchMap,
  tap,
  timer,
} from 'rxjs';
import { ArticleService } from '../services/article.service';
import { JsonPipe } from '@angular/common';
import { getErrorMessage } from '../../../misc/error';
import { isIntegerValidator } from '../../validators/is-integer.validator';
import { filterInteger } from '../../../misc/guide';
import { nameAsyncValidator } from '../../validators/name.validator';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, JsonPipe],
})
export default class CreateComponent implements OnInit {
  errorMsg = '';
  f = this.fb.nonNullable.group({
    name: [
      '',
      {
        validators: [Validators.required, Validators.maxLength(10)],
        asyncValidators: [nameAsyncValidator(this.cd, this.http)],
      },
    ],
    price: [0, [Validators.required, Validators.min(0)]],
    qty: [1, [Validators.required, Validators.min(0), isIntegerValidator]],
  });
  faCircleNotch = faCircleNotch;
  faPlus = faPlus;
  isAdding = false;

  constructor(
    private articleService: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  filterInteger(event: KeyboardEvent) {
    return filterInteger(event);
  }

  getErrorMessage(control: FormControl) {
    return getErrorMessage(control);
  }

  ngOnInit(): void {}

  submit(): Observable<void> {
    return of(undefined).pipe(
      tap(() => {
        this.isAdding = true;
      }),
      delay(1000),
      switchMap(() => this.articleService.add(this.f.getRawValue())),
      switchMap(() => this.articleService.load()),
      switchMap(() => this.router.navigate(['..'], { relativeTo: this.route })),
      map(() => {}),
      catchError((err: any) => {
        if (err instanceof Error) {
          this.errorMsg = err.message;
        }
        return of(undefined);
      }),
      finalize(() => {
        this.isAdding = false;
        this.cd.markForCheck();
      })
    );
  }
}
