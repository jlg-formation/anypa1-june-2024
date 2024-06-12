import { Directive, ElementRef, Input, OnInit } from '@angular/core';

type Mode = 'focus' | 'select' | '';

@Directive({
  selector: '[appAutofocus]',
  standalone: true,
})
export class AutofocusDirective implements OnInit {
  @Input()
  appAutofocus: Mode = 'focus';

  constructor(private elt: ElementRef<HTMLInputElement>) {
    console.log('elt: ', elt);
  }

  ngOnInit(): void {
    if (this.appAutofocus === 'select') {
      this.elt.nativeElement.select();
      return;
    }
    this.elt.nativeElement.focus();
  }
}
