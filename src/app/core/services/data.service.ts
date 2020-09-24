import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  ITemplateDto,
  ITemplateSummaryDto,
  ITemplateWithIdDto,
} from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = '';
  private templateBaseUrl = this.baseUrl + '/api/templates';

  private refreshSubject = new BehaviorSubject<boolean>(true);
  refreshAction$ = this.refreshSubject.asObservable();

  templates$ = this.refreshAction$.pipe(
    switchMap(() =>
      this.http.get<ITemplateWithIdDto[]>(this.templateBaseUrl).pipe(
        map((ts) =>
          ts.map(
            (t) =>
              ({
                id: t.id,
                templateName: t.templateName,
                entityTypeName: t.entityTypeName,
              } as ITemplateSummaryDto)
          )
        ),
        catchError(this.handleError)
      )
    )
  );

  constructor(private http: HttpClient) {}

  getTemplate(id: number): Observable<ITemplateWithIdDto> {
    return this.http
      .get<ITemplateWithIdDto>(this.templateBaseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  addTemplate(template: ITemplateDto): Observable<ITemplateWithIdDto> {
    return this.http
      .post<ITemplateWithIdDto>(this.templateBaseUrl, template)
      .pipe(
        tap(() => this.refreshSubject.next(true)),
        catchError(this.handleError)
      );
  }

  updateTemplate(id: number, template: ITemplateDto): Observable<void> {
    return this.http.put<void>(this.templateBaseUrl + '/' + id, template).pipe(
      tap(() => this.refreshSubject.next(true)),
      catchError(this.handleError)
    );
  }

  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>(this.templateBaseUrl + '/' + id).pipe(
      tap(() => this.refreshSubject.next(true)),
      catchError(this.handleError)
    );
  }

  // tslint:disable-next-line: no-any
  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
