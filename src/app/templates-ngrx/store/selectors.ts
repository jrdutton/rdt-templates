import { createSelector } from '@ngrx/store';
import { TemplateState } from './template-reducers';
import { TemplatesState } from './templates-reducers';

export interface AppState {
  templates: TemplatesState;
  template: TemplateState;
}

export const selectTemplatesState = (state: AppState) => state.templates;
export const selectTemplateState = (state: AppState) => state.template;

export const selectTemplates = createSelector(
  selectTemplatesState,
  (state: TemplatesState) => state.templates
);
export const selectTemplatesLoading = createSelector(
  selectTemplatesState,
  (state: TemplatesState) => state.loading
);
export const selectTemplatesErrorMessage = createSelector(
  selectTemplatesState,
  (state: TemplatesState) => state.errorMessage
);

export const selectTemplate = createSelector(
  selectTemplateState,
  (state: TemplateState) => state.template
);
export const selectTemplateLoading = createSelector(
  selectTemplateState,
  (state: TemplateState) => state.loading
);
export const selectTemplateErrorMessage = createSelector(
  selectTemplateState,
  (state: TemplateState) => state.errorMessage
);
