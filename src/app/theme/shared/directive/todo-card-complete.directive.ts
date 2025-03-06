// Angular import
import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[appTodoCardComplete]' })
export class TodoCardCompleteDirective {
  private elements = inject(ElementRef);

  // public method
  @HostListener('click', ['$event'])
  onToggle($event: { preventDefault: () => void }) {
    $event.preventDefault();
    this.elements.nativeElement.classList.toggle('complete');
  }
}
