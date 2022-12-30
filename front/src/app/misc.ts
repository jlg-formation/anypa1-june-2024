import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { delay, lastValueFrom, of, switchMap, timer } from 'rxjs';

export const backEndValidator = (
  url: string,
  http: HttpClient
): AsyncValidatorFn => {
  console.log('url: ', url);
  return (control: AbstractControl) => {
    return of(control.value).pipe(
      delay(500),
      switchMap(async (value) => {
        console.log('control: ', control.value);
        try {
          await lastValueFrom(timer(2000));
          const json = await lastValueFrom(
            http.post<{ result: boolean; message: string }>(url, {
              value,
            })
          );
          if (!json.result) {
            return { backEnd: json.message };
          }
        } catch (err) {
          console.log('err: ', err);
          return null;
        }
        return null;
      })
    );
  };
};
