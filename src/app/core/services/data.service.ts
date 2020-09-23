import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  constructor(private http: HttpClient) {}

  getTemplates(): Observable<ITemplateSummaryDto[]> {
    return this.http
      .get<ITemplateSummaryDto[]>(this.templateBaseUrl)
      .pipe(catchError(this.handleError));
  }

  getTemplate(id: number): Observable<ITemplateWithIdDto> {
    return this.http
      .get<ITemplateWithIdDto>(this.templateBaseUrl + '/' + id)
      .pipe(catchError(this.handleError));
  }

  addTemplate(template: ITemplateDto): Observable<ITemplateWithIdDto> {
    return this.http
      .post<ITemplateWithIdDto>(this.templateBaseUrl, template)
      .pipe(catchError(this.handleError));
  }

  updateTemplate(id: number, template: ITemplateDto): Observable<void> {
    return this.http
      .put<void>(this.templateBaseUrl + '/' + id, template)
      .pipe(catchError(this.handleError));
  }

  deleteTemplate(id: number): Observable<void> {
    return this.http
      .delete<void>(this.templateBaseUrl + '/' + id)
      .pipe(catchError(this.handleError));
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
