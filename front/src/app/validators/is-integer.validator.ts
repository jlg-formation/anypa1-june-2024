import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const isIntegerValidator: ValidatorFn = (
  control: AbstractControl
): null | ValidationErrors => {
  const value = +control.value;
  if (value !== Math.floor(value)) {
    return {
      isInteger: {
        message: 'not integer',
      },
    };
  }
  return null;
};
