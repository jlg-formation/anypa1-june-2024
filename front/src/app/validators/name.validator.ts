import { ChangeDetectorRef } from '@angular/core';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';

export const nameAsyncValidator =
  (cd: ChangeDetectorRef): AsyncValidatorFn =>
  async (control: AbstractControl) => {
    const name = control.value;
    const response = await fetch('http://localhost:3000/api/check', {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: { 'Content-Type': 'application/json' },
    });
    const { result }: { result: boolean } = await response.json();
    const myResult = result ? null : { badname: true };
    cd.markForCheck();
    return myResult;
  };
