import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CityResponse, DepartmentResponse } from 'src/app/models/locations.interface';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  constructor(private http: HttpClient, private router: Router) { }

  // Obtener departamentos
  getDepartments(): Observable<DepartmentResponse | any> {
    return this.http
      .get<DepartmentResponse>(`${environment.API_URL}departments/list`, {})
      .pipe(
        map((res: DepartmentResponse) => {
          return res;
        }),
        // Capturar error
        catchError((err) => this.handlerError(err))
      );
  }

  // Obtener ciudades por departamento
  getCities(departmentId: number): Observable<CityResponse | any> {
    return this.http
      .get<CityResponse>(
        `${environment.API_URL}cities/list/${departmentId}`,
        {}
      )
      .pipe(
        map((res: CityResponse) => {
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
