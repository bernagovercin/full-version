import { inject, Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, map, switchMap, tap } from 'rxjs/operators';
import { Customer } from 'src/app/theme/shared/models/customer';
import { SortDirection } from 'src/app/theme/shared/directive/sortable.directive';
import { CustomerService } from 'src/app/theme/shared/service/customer.service';
import { DecimalPipe } from '@angular/common';

interface SearchResult {
  customers: Customer[];
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

function sort(customers: Customer[], column: string, direction: string): Customer[] {
  if (direction === '' || column === '') {
    return customers;
  } else {
    return [...customers].sort((a, b) => {
      const valueA = a[column as keyof Customer];
      const valueB = b[column as keyof Customer];

      // Eğer değerler boolean ise, sıralama yapma
      if (typeof valueA === 'boolean' || typeof valueB === 'boolean') {
        return 0;
      }

      const res = compare(valueA, valueB);
      return direction === 'asc' ? res : -res;
    });
  }
}
function matches(customer: Customer, term: string, pipe?: PipeTransform) {
  return (
    customer.customerName.toLowerCase().includes(term.toLowerCase()) ||
    customer.location.toLowerCase().includes(term.toLowerCase()) ||
    customer.gender.toLowerCase().includes(term.toLowerCase()) ||
    customer.email.toLowerCase().includes(term.toLowerCase()) ||
    customer.phoneNumber.toLowerCase().includes(term.toLowerCase()) ||
    (pipe && pipe.transform(customer.customerId).includes(term)) // Sayısal değerleri de filtrele
  );
}

@Injectable({ providedIn: 'root' })
export class CustomerListService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  public _search$ = new Subject<void>();
  private _customers$ = new BehaviorSubject<Customer[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  private pipe = inject(DecimalPipe); // DecimalPipe ekleniyor


  get search$() {
    return this._search$;}

  private _state: State = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private customerService: CustomerService) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        delay(200),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._customers$.next(result.customers);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get customers$() {
    return this._customers$.asObservable();
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
  get sortColumn() {
    return this._state.sortColumn;
  }
  get sortDirection() {
    return this._state.sortDirection;
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
  
    return this.customerService.getCustomers().pipe(
      switchMap((customers) => {
        // 1. sort
        let sortedCustomers = sort(customers, sortColumn, sortDirection);
  
        // 2. filter
        sortedCustomers = sortedCustomers.filter((customer) => matches(customer, searchTerm, this.pipe));
        const total = sortedCustomers.length;
  
        // 3. paginate
        sortedCustomers = sortedCustomers.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ customers: sortedCustomers, total });
      })
    );
  }}