import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { Effects } from './store/effects';
import * as template from './store/template-reducers';
import * as templates from './store/templates-reducers';
import { TemplateAddEditFormComponent } from './template-add-edit-form/template-add-edit-form.component';
import { TemplateAddEditComponent } from './template-add-edit/template-add-edit.component';
import { TemplateListComponent } from './template-list/template-list.component';
import { TemplatesComponent } from './templates/templates.component';

@NgModule({
  declarations: [
    TemplateAddEditComponent,
    TemplateListComponent,
    TemplatesComponent,
    TemplateAddEditFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TemplatesComponent,
        children: [
          {
            path: '',
            component: TemplateAddEditComponent,
          },
          {
            path: ':id',
            component: TemplateAddEditComponent,
          },
        ],
      },
    ]),
    StoreModule.forRoot({
      templates: templates.reducer,
      template: template.reducer,
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([Effects]),
  ],
})
export class TemplatesNgrxModule {}
