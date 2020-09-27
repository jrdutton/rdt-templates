import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ITemplateSummaryDto } from '../../shared/interfaces';

@Component({
  selector: 'rdt-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateListComponent implements OnInit {
  @Input()
  public templates: ITemplateSummaryDto[] | null = null;

  root = 'Templates-NgRx';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: no-any
  isActive(currentRoute: any[], exact = true): boolean {
    return this.router.isActive(this.router.createUrlTree(currentRoute), exact);
  }
}
