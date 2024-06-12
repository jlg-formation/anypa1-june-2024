import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, delay, map, of, switchMap } from 'rxjs';

const url = '/api/check';

export const nameAsyncValidator =
  (cd: ChangeDetectorRef, http: HttpClient): AsyncValidatorFn =>
  (control: AbstractControl): Observable<null | ValidationErrors> => {
    const name = control.value;
    return of(undefined).pipe(
      delay(300),
      switchMap(() => http.post<{ result: boolean }>(url, { name })),
      map(({ result }) => {
        cd.markForCheck();
        return result ? null : { badname: true };
      }),
      catchError((err) => {
        return of(null);
      })
    );
  };
