import { Action, createReducer, on } from '@ngrx/store';
import { ITemplateSummaryDto } from '../../shared/interfaces';
import * as Actions from './actions';

export interface TemplatesState {
  templates: ITemplateSummaryDto[];
  loading: boolean;
  errorMessage: string | null;
}

export const initialState: TemplatesState = {
  templates: [],
  loading: false,
  errorMessage: null,
};

const templatesReducer = createReducer(
  initialState,
  on(Actions.getTemplates, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getTemplatesSuccess, (state, { templates }) => ({
    ...state,
    templates,
    loading: false,
  })),
  on(Actions.getTemplatesFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
    loading: false,
  }))
);

export function reducer(
  state: TemplatesState | undefined,
  action: Action
): TemplatesState {
  return templatesReducer(state, action);
}
