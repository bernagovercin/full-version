// Angular import
import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[appProductRemove]' })
export class ProductRemoveDirective {
  private elements = inject(ElementRef);

  // public method
  @HostListener('click', ['$event'])
  onToggle($event: { preventDefault: () => void }) {
    $event.preventDefault();
    const parent = this.elements.nativeElement.parentElement.parentElement.parentElement;
    parent.remove();
  }
}
