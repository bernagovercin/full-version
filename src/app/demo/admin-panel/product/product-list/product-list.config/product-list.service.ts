import { Injectable, PipeTransform, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from '../../../../../theme/shared/directive/sortable.directive';
import { environment } from 'src/environments/environment';

interface SearchResult {
  productList: any[];
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
export class productListService {
  private pipe = inject(DecimalPipe);
  private httpClient = inject(HttpClient);

  private _loading$ = new BehaviorSubject<boolean>(true);
  public _search$ = new Subject<void>();
  private _productList$ = new BehaviorSubject<any[]>([]);
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
        this._productList$.next(result.productList);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get productList$() {
    return this._productList$.asObservable();
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

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get<any[]>(environment.apiUrl + "Products/getall", { headers }).pipe(
      switchMap((data) => {
        // 1. sort
        let productList = sort(data, sortColumn, sortDirection);

        // 2. filter
        productList = productList.filter((product) => matches(product, searchTerm, this.pipe));
        const total = productList.length;

        // 3. paginate
        productList = productList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ productList, total });
      })
    );
  }
}

// eslint-disable-next-line
function sort(productList: any[], column: string, direction: string): any[] {
  if (direction === '' || column === '') {
    return productList;
  } else {
    return [...productList].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(product: any, term: string, pipe: PipeTransform) {
  return (
    product.productName.toLowerCase().includes(term.toLowerCase()) ||
    product.category.toLowerCase().includes(term.toLowerCase()) ||
    product.colorName.toLowerCase().includes(term.toLowerCase()) ||
    pipe.transform(product.price).includes(term) ||
    pipe.transform(product.quantity).includes(term)
  );
}