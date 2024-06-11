import { FormControl } from '@angular/forms';

export const getErrorMessage = (control: FormControl): string => {
  if (control.untouched) {
    return '';
  }
  if (control.errors === null) {
    return '';
  }
  if (control.errors['required']) {
    return 'Champ Obligatoire';
  }
  if (control.errors['maxlength']) {
    const o = control.errors['maxlength'];
    return `Champ Trop Long (${o.actualLength} > ${o.requiredLength})`;
  }
  if (control.errors['min']) {
    return `Le Champ doit être positif`;
  }
  throw new Error('error message not found');
};
