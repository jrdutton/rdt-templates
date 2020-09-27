import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ITemplateSummaryDto } from '../../shared/interfaces';
import { getTemplates } from '../store/actions';
import { AppState, selectTemplates } from '../store/selectors';

@Component({
  selector: 'rdt-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  public templates$: Observable<ITemplateSummaryDto[]>;

  constructor(private readonly store: Store<AppState>) {
    this.templates$ = this.store
      .select(selectTemplates)
      .pipe(tap((ts) => console.log(JSON.stringify(ts))));
  }

  ngOnInit(): void {
    this.store.dispatch(getTemplates());
  }
}
