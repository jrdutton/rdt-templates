import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, debounceTime, map, switchMap } from 'rxjs/operators';
import {
  ITemplateSummaryDto,
  ITemplateWithIdDto,
} from '../../shared/interfaces';
import {
  getTemplate,
  getTemplateFailure,
  getTemplates,
  getTemplatesFailure,
  getTemplatesSuccess,
  getTemplateSuccess,
} from './actions';

@Injectable()
export class Effects {
  private baseUrl = '';
  private templateBaseUrl = this.baseUrl + '/api/templates';

  getTemplates$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTemplates),
      debounceTime(200),
      switchMap(() =>
        this.http.get<ITemplateWithIdDto[]>(this.templateBaseUrl).pipe(
          map((ts) =>
            getTemplatesSuccess({
              templates: ts.map(
                (t) =>
                  ({
                    id: t.id,
                    templateName: t.templateName,
                    entityTypeName: t.entityTypeName,
                  } as ITemplateSummaryDto)
              ),
            })
          ),
          catchError((error) =>
            of(getTemplatesFailure({ errorMessage: this.handleError(error) }))
          )
        )
      )
    )
  );

  getTemplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTemplate),
      debounceTime(200),
      switchMap((props) =>
        props.id === 0
          ? of(
              getTemplateSuccess({
                template: {} as ITemplateWithIdDto,
              })
            )
          : this.http
              .get<ITemplateWithIdDto>(this.templateBaseUrl + '/' + props.id)
              .pipe(
                map((t) => getTemplateSuccess({ template: t })),
                catchError((error) =>
                  of(
                    getTemplateFailure({
                      errorMessage: this.handleError(error),
                    })
                  )
                )
              )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}

  // tslint:disable: no-any
  private handleError(err: any): string {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    return errorMessage;
  }
  // tslint:enable: no-any
}
