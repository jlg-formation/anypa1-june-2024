import { AfterContentInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[libAutofocus]',
})
export class AutofocusDirective implements AfterContentInit {
  constructor(private elt: ElementRef<HTMLInputElement>) {}
  ngAfterContentInit(): void {
    queueMicrotask(() => {
      this.elt.nativeElement.select();
    });
  }
}
