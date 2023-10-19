import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl: string = environment.api;
  private user?: User;

  constructor(private http: HttpClient) {}

  get _currentUser(): User | undefined {
    if (!this.user) {
      return undefined;
    }
    return structuredClone(this.user);
  }

  login(username: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        tap((user) => {
          this.user = user;
        }),
        tap((user) => localStorage.setItem('token', user.token))
      );
  }

  checkAuthentication(): Observable<boolean> {
    const token = localStorage.getItem('token');

    if (!token) {
      return of(false);
    }

    return of(true);
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
