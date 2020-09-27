import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITemplateWithIdDto } from 'src/app/shared/interfaces';
import {
  addTemplate,
  deleteTemplate,
  getEmptyTemplate,
  getTemplate,
  updateTemplate,
} from '../store/actions';
import {
  AppState,
  selectTemplate,
  selectTemplateErrorMessage,
  selectTemplateLoading,
} from '../store/selectors';

@Component({
  selector: 'rdt-template-add-edit',
  templateUrl: './template-add-edit.component.html',
  styleUrls: ['./template-add-edit.component.scss'],
})
export class TemplateAddEditComponent implements OnInit {
  template$!: Observable<ITemplateWithIdDto | null>;
  loading$!: Observable<boolean>;
  errorMessage$!: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.template$ = this.store.select(selectTemplate);
    this.loading$ = this.store.select(selectTemplateLoading);
    this.errorMessage$ = this.store.select(selectTemplateErrorMessage);
    this.route.params.subscribe((params: Params) => {
      if (params.id !== undefined) {
        const id = +params.id;
        this.store.dispatch(getTemplate({ id }));
      } else {
        this.store.dispatch(getEmptyTemplate());
      }
    });
  }

  onSubmit(template: ITemplateWithIdDto): void {
    if (template?.id) {
      this.store.dispatch(updateTemplate({ id: template.id, template }));
    } else if (template) {
      this.store.dispatch(addTemplate({ template }));
    }
  }

  onDelete(id: number): void {
    this.store.dispatch(deleteTemplate({ id }));
  }
}
