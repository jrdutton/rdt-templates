import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  concat,
  Observable,
  of,
  scheduled,
  throwError,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  IObsWithStatusResult,
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

  private selectedTemplateSubject = new BehaviorSubject<number>(0);
  selectedTemplateAction$ = this.selectedTemplateSubject.asObservable();

  private refreshSubject = new BehaviorSubject<boolean>(true);
  refreshAction$ = this.refreshSubject.asObservable();

  templates$ = this.refreshAction$.pipe(
    debounceTime(200),
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

  template$ = this.selectedTemplateAction$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((id) =>
      id === 0
        ? of({} as ITemplateWithIdDto)
        : this.http
            .get<ITemplateWithIdDto>(this.templateBaseUrl + '/' + id)
            .pipe(catchError(this.handleError))
    )
  );

  templateWithStatus$: Observable<
    IObsWithStatusResult<ITemplateWithIdDto>
  > = this.selectedTemplateAction$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    switchMap((id) =>
      concat(
        of({ loading: true } as IObsWithStatusResult<ITemplateWithIdDto>),
        id === 0
          ? of({ loading: false, value: {} } as IObsWithStatusResult<
              ITemplateWithIdDto
            >)
          : this.http
              .get<ITemplateWithIdDto>(this.templateBaseUrl + '/' + id)
              .pipe(
                map(
                  (value) =>
                    ({ loading: false, value } as IObsWithStatusResult<
                      ITemplateWithIdDto
                    >)
                ),
                catchError(this.handleErrorWrapped)
              )
      )
    )
  );

  constructor(private http: HttpClient) {}

  selectTemplate(id: number): void {
    this.selectedTemplateSubject.next(id);
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

  // tslint:disable: no-any
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

  private handleErrorWrapped(err: any): Observable<IObsWithStatusResult<any>> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return of({ error: errorMessage } as IObsWithStatusResult<any>);
  }
  // tslint:enable: no-any
}
