import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
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
  ],
})
export class TemplatesModule {}
