import { FormControl } from '@angular/forms';

export const getErrorMessage = (control: FormControl): string => {
  console.log('getErrorMessage', control.value);
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
  if ('isInteger' in control.errors) {
    return `Le Champ doit être un entier`;
  }
  if ('badname' in control.errors) {
    return `Valeur interdite`;
  }
  throw new Error('error message not found');
};
