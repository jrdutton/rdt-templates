import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/templates' },
  {
    path: 'templates',
    loadChildren: () =>
      import('./templates/templates.module').then((m) => m.TemplatesModule),
  },
  {
    path: 'templates-ngrx',
    loadChildren: () =>
      import('./templates-ngrx/templates-ngrx.module').then(
        (m) => m.TemplatesNgrxModule
      ),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/templates' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
