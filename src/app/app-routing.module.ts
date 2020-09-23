import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/templates' },
  {
    path: 'templates',
    loadChildren: () =>
      import('./templates/templates.module').then((m) => m.TemplatesModule),
  },
  { path: '**', pathMatch: 'full', redirectTo: '/templates' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
