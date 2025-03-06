import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { UserService } from 'src/app/theme/shared/service/user.service';
import { User } from 'src/app/theme/shared/models/user';

interface State {
  searchTerm: string;
  statusFilter: string;
  genderFilter: string;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class UserListService {
 
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _users$ = new BehaviorSubject<User[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    searchTerm: '',
    statusFilter: 'all',
    genderFilter: 'all',
    page: 1,
    pageSize: 5
  };

  constructor(private userService: UserService) {
    this._search$
      .pipe(
        tap(() => this._loading$.next(true)),
        debounceTime(200),
        switchMap(() => this._search()),
        tap(() => this._loading$.next(false))
      )
      .subscribe((result) => {
        this._users$.next(result.users);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get users$() {
    return this._users$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get searchTerm() {
    return this._state.searchTerm;
  }
  get statusFilter() {
    return this._state.statusFilter;
  }
  get genderFilter() {
    return this._state.genderFilter;
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }

  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set statusFilter(statusFilter: string) {
    this._set({ statusFilter });
  }
  set genderFilter(genderFilter: string) {
    this._set({ genderFilter });
  }
  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<{ users: User[]; total: number }> {
    return this.userService.getUsers().pipe(
      map(users => {
        let filteredUsers = this._applyFilters(users);
        const total = filteredUsers.length;
        filteredUsers = this._paginate(filteredUsers);
        return { users: filteredUsers, total };
      })
    );
  }

  private _applyFilters(users: User[]): User[] {
    let filteredUsers = users;

    // Arama işlemi
    if (this._state.searchTerm) {
      filteredUsers = filteredUsers.filter(user =>
        user.fullName.toLowerCase().includes(this._state.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this._state.searchTerm.toLowerCase())
      );
    }

    // Durum filtresi
    if (this._state.statusFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user =>
        user.status === (this._state.statusFilter === 'active')
      );
    }

    // Cinsiyet filtresi
    if (this._state.genderFilter !== 'all') {
      filteredUsers = filteredUsers.filter(user =>
        user.gender.toString() === this._state.genderFilter
      );
    }

    return filteredUsers;
  }

  private _paginate(users: User[]): User[] {
    const startIndex = (this._state.page - 1) * this._state.pageSize;
    return users.slice(startIndex, startIndex + this._state.pageSize);
  }
} 
