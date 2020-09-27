import { createAction, props } from '@ngrx/store';
import {
  ITemplateDto,
  ITemplateSummaryDto,
  ITemplateWithIdDto,
} from '../../shared/interfaces';

export const getTemplates = createAction('[Templates] Get');
export const getTemplatesSuccess = createAction(
  '[Templates] Get Success',
  props<{ templates: ITemplateSummaryDto[] }>()
);
export const getTemplatesFailure = createAction(
  '[Templates] Get Failure',
  props<{ errorMessage: string }>()
);

export const getEmptyTemplate = createAction('[Template] Get Empty');
export const getTemplate = createAction(
  '[Template] Get',
  props<{ id: number }>()
);
export const getTemplateSuccess = createAction(
  '[Template] Get Success',
  props<{ template: ITemplateWithIdDto }>()
);
export const getTemplateFailure = createAction(
  '[Template] Get Failure',
  props<{ errorMessage: string }>()
);

export const addTemplate = createAction(
  '[Template] Add',
  props<{ template: ITemplateDto }>()
);
export const addTemplateSuccess = createAction(
  '[Template] Add Success',
  props<{ template: ITemplateWithIdDto }>()
);
export const addTemplateFailure = createAction(
  '[Template] Add Failure',
  props<{ errorMessage: string }>()
);

export const updateTemplate = createAction(
  '[Template] Update',
  props<{ id: number; template: ITemplateDto }>()
);
export const updateTemplateSuccess = createAction(
  '[Template] Update Success',
  props<{ template: ITemplateWithIdDto }>()
);
export const updateTemplateFailure = createAction(
  '[Template] Update Failure',
  props<{ errorMessage: string }>()
);

export const deleteTemplate = createAction(
  '[Template] Delete',
  props<{ id: number }>()
);
export const deleteTemplateSuccess = createAction('[Template] Delete Success');
export const deleteTemplateFailure = createAction(
  '[Template] Delete Failure',
  props<{ errorMessage: string }>()
);
