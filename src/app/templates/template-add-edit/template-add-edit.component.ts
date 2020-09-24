import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ITemplateWithIdDto } from 'src/app/shared/interfaces';
import { DataService } from '../../core/services';

@Component({
  selector: 'rdt-template-add-edit',
  templateUrl: './template-add-edit.component.html',
  styleUrls: ['./template-add-edit.component.scss'],
})
export class TemplateAddEditComponent implements OnInit {
  template$!: Observable<ITemplateWithIdDto>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id !== undefined) {
        const id = +params.id;
        this.template$ = this.dataService.getTemplate(id);
      } else {
        this.template$ = of({} as ITemplateWithIdDto);
      }
    });
  }

  onSubmit(template: ITemplateWithIdDto): void {
    if (template?.id) {
      this.dataService.updateTemplate(template.id, template).subscribe();
    } else if (template) {
      this.dataService.addTemplate(template).subscribe((t) => {
        this.router.navigate(['/templates', t.id]);
      });
    }
  }

  onDelete(id: number): void {
    this.dataService
      .deleteTemplate(id)
      .subscribe(() => this.router.navigate(['/templates']));
  }
}
