// angular import
import { Injectable } from '@angular/core';

// rxjs
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

// project import
import { warehouse } from './helpdesk-warehouse-type';
import { WAREHOUSES } from './helpdesk-warehouse-data';
import { SortDirection } from '../../../../theme/shared/directive/sortable.directive';

interface SearchResult {
  warehouses: warehouse[];
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
// eslint-disable-next-line
function sort(warehouses: any, column: string, direction: string): warehouse[] {
  if (direction === '' || column === '') {
    return warehouses;
  } else {
    return [...warehouses].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(warehouse: warehouse, term: string) {
  return (
    warehouse.name.toLowerCase().includes(term.toLowerCase()) ||
    warehouse.email.toLowerCase().includes(term.toLowerCase()) ||
    warehouse.account.toLowerCase().includes(term.toLowerCase()) ||
    warehouse.login.toLowerCase().includes(term.toLowerCase())
  );
}

@Injectable({ providedIn: 'root' })
export class helpDeskWarehouseService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private warehouse$ = new BehaviorSubject<warehouse[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

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
        this.warehouse$.next(result.warehouses);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get warehouses$() {
    return this.warehouse$.asObservable();
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
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
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
    let warehouses = sort(WAREHOUSES, sortColumn, sortDirection);

    // 2. filter
    warehouses = warehouses.filter((warehouse) => matches(warehouse, searchTerm));
    const total = warehouses.length;

    // 3. paginate
    warehouses = warehouses.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({ warehouses, total });
  }
}
