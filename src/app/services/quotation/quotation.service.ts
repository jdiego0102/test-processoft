import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Quotation, QuotationResponse } from 'src/app/models/quotation.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  });

  constructor(private http: HttpClient) { }

  // Realizar petición al servidor para guardar almacenar predio
  saveQuotation(quotation: Quotation): Observable<QuotationResponse | any> {

    return this.http
      .post<QuotationResponse>(`${environment.API_URL}quotation/create`, quotation, {
        headers: this.headers,
      })
      .pipe(
        map((res: QuotationResponse) => {
          return res;
        }),
        // Capturar error
        catchError((err) => this.handlerError(err))
      );
  }

  // Obtener modelos de carros
  getcarModels(): Observable<[] | any> {
    return this.http
      .get<[]>(`https://integrador.processoft.com.co/api/menutest`, {})
      .pipe(
        map((res: []) => {
          return res;
        }),
        // Capturar error
        catchError((err) => this.handlerError(err))
      );
  }

  // Controlar errores  de inicio de sesión
  handlerError(err: any): Observable<never> {
    let errorValue = false;
    if (err) {
      errorValue = true;
    }
    return throwError(errorValue);
  }
}
