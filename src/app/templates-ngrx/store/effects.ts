import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  ITemplateSummaryDto,
  ITemplateWithIdDto,
} from '../../shared/interfaces';
import {
  addTemplate,
  addTemplateFailure,
  addTemplateSuccess,
  deleteTemplate,
  deleteTemplateFailure,
  deleteTemplateSuccess,
  getTemplate,
  getTemplateFailure,
  getTemplates,
  getTemplatesFailure,
  getTemplatesSuccess,
  getTemplateSuccess,
  updateTemplate,
  updateTemplateFailure,
  updateTemplateSuccess,
} from './actions';

@Injectable()
export class Effects {
  private baseUrl = '';
  private templateBaseUrl = this.baseUrl + '/api/templates-ngrx';

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
        this.http
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

  addTemplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTemplate),
      concatMap((props) =>
        this.http
          .post<ITemplateWithIdDto>(this.templateBaseUrl, props.template)
          .pipe(
            concatMap((t) => [
              addTemplateSuccess({ template: t }),
              getTemplates(),
            ]),
            catchError((error) =>
              of(
                addTemplateFailure({
                  errorMessage: this.handleError(error),
                })
              )
            )
          )
      )
    )
  );

  updateTemplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTemplate),
      concatMap((props) =>
        this.http
          .put<void>(this.templateBaseUrl + '/' + props.id, props.template)
          .pipe(
            concatMap(() => [
              updateTemplateSuccess({
                template: { id: props.id, ...props.template },
              }),
              getTemplates(),
            ]),
            catchError((error) =>
              of(
                updateTemplateFailure({
                  errorMessage: this.handleError(error),
                })
              )
            )
          )
      )
    )
  );

  deleteTemplate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTemplate),
      concatMap((props) =>
        this.http.delete<void>(this.templateBaseUrl + '/' + props.id).pipe(
          concatMap(() => [deleteTemplateSuccess(), getTemplates()]),
          catchError((error) =>
            of(
              deleteTemplateFailure({
                errorMessage: this.handleError(error),
              })
            )
          )
        )
      )
    )
  );

  addTemplateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(addTemplateSuccess),
        tap((props) =>
          this.router.navigate(['/templates-ngrx', props.template.id])
        )
      ),
    { dispatch: false }
  );

  deleteTemplateSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteTemplateSuccess),
        tap(() => this.router.navigate(['/templates-ngrx']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

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
