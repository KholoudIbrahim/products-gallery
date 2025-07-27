import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://fakestoreapi.com/auth/login';
  private tokenSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('auth_token')
  );

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http
      .post<{ token: string }>(this.apiUrl, { username, password })
      .pipe(
        tap((res) => {
          if (!res.token) throw new Error('Invalid login response');
          localStorage.setItem('auth_token', res.token);
          this.tokenSubject.next(res.token);
        }),
        map((res) => res.token)
      );
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  get token$(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }
}
