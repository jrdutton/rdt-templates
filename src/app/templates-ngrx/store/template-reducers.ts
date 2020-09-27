import { Action, createReducer, on } from '@ngrx/store';
import { ITemplateWithIdDto } from '../../shared/interfaces';
import * as Actions from './actions';

export interface TemplateState {
  template: ITemplateWithIdDto;
  loading: boolean;
  errorMessage: string | null;
}

export const initialState: TemplateState = {
  template: {} as ITemplateWithIdDto,
  loading: false,
  errorMessage: null,
};

const templateReducer = createReducer(
  initialState,
  on(Actions.getEmptyTemplate, (state) => ({
    ...state,
    template: {} as ITemplateWithIdDto,
  })),
  on(Actions.getTemplate, (state) => ({
    ...state,
    loading: true,
  })),
  on(Actions.getTemplateSuccess, (state, { template }) => ({
    ...state,
    template,
    loading: false,
  })),
  on(Actions.getTemplateFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
    loading: false,
  })),
  on(Actions.addTemplateSuccess, (state, { template }) => ({
    ...state,
    template,
  })),
  on(Actions.addTemplateFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
  on(Actions.updateTemplateSuccess, (state, { template }) => ({
    ...state,
    template,
  })),
  on(Actions.updateTemplateFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  })),
  on(Actions.deleteTemplateSuccess, (state) => ({
    ...state,
    template: {} as ITemplateWithIdDto,
  })),
  on(Actions.deleteTemplateFailure, (state, { errorMessage }) => ({
    ...state,
    errorMessage,
  }))
);

export function reducer(
  state: TemplateState | undefined,
  action: Action
): TemplateState {
  return templateReducer(state, action);
}
