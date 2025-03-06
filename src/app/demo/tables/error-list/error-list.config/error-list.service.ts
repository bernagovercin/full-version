// angular import
import { Injectable, PipeTransform, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

// rxjs import
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

// project import
import { errorList } from './error';
import { ERROR } from './error';
import { SortDirection } from 'src/app/theme/shared/directive/sortable.directive';

interface SearchResult {
  error: errorList[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

@Injectable({
  providedIn: 'root'
})
export class ErrorListService {
  private pipe = inject(DecimalPipe);

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _errorList$ = new BehaviorSubject<errorList[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  // constructor
  constructor() {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._errorList$.next(result.error);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get errorList$() {
    return this._errorList$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  set page(page: number) {
    this._set({ page });
  }
  get pageSize() {
    return this._state.pageSize;
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  get searchTerm() {
    return this._state.searchTerm;
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: string) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

    // 1. sort
    let error = sort(ERROR, sortColumn, sortDirection);

    // 2. filter
    error = error.filter((ERROR) => matches(ERROR, searchTerm, this.pipe));
    const total = error.length;

    // 3. paginate
    error = error.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ error, total });
  }
}

// eslint-disable-next-line
function sort(error: any, column: string, direction: string): errorList[] {
  if (direction === '' || column === '') {
    return error;
  } else {
    return [...error].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(error: errorList, term: string, pipe: PipeTransform) {
  return (
    error.id.toLowerCase().includes(term.toLowerCase()) ||
    error.customer_name.toLowerCase().includes(term.toLowerCase()) ||
    error.branch.toLowerCase().includes(term.toLowerCase()) ||
    error.payment_type.toLowerCase().includes(term.toLowerCase()) ||
    error.registered.toLowerCase().includes(term.toLowerCase()) ||
    error.status.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(error.quantity).includes(term)
  );
}
