// Angular import
import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[appProductComplete]' })
export class ProductCompleteDirective {
  private elements = inject(ElementRef);

  // public method
  @HostListener('click', ['$event'])
  onToggle($event: { preventDefault: () => void }) {
    $event.preventDefault();
    this.elements.nativeElement.classList.toggle('done');
  }
}
