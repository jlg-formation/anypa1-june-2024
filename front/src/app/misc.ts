import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { lastValueFrom, timer } from 'rxjs';

export const backEndValidator = (
  url: string,
  http: HttpClient
): AsyncValidatorFn => {
  console.log('url: ', url);
  return async (control: AbstractControl) => {
    console.log('control: ', control.value);
    try {
      await lastValueFrom(timer(2000));
      const json = await lastValueFrom(
        http.post<{ result: boolean; message: string }>(url, {
          value: control.value,
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
  };
};
