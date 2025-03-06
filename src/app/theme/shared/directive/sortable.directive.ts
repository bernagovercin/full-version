// angular import
import { Directive, HostBinding, HostListener, Input, output } from '@angular/core';

export type SortDirection = 'asc' | 'desc' | '';  // SortDirection'ı export et
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

export interface SortEvent {  // SortEvent'ı export et
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[appSortable]',
  standalone: true
})
export class NgbdSortableHeaderDirective {}
