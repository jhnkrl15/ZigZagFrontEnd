import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from '../model/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:5262/api/Books';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiUrl).pipe(
      catchError(this.handleError<Book[]>('getBooks', []))
    );
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }

  updateBook(book: Book): Observable<any> {
    const url = `${this.apiUrl}/${book.id}`;
    return this.http.put(url, book).pipe(
      catchError(this.handleError<any>('updateBook'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
