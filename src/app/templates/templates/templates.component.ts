import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../core/services';
import { ITemplateSummaryDto } from '../../shared/interfaces';

@Component({
  selector: 'rdt-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  public templates$: Observable<ITemplateSummaryDto[]>;

  constructor(private dataService: DataService) {
    this.templates$ = this.dataService.getTemplates();
  }

  ngOnInit(): void {}
}
