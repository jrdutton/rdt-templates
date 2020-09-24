import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormUtilsService } from 'src/app/core/services';
import { ITemplateWithIdDto } from 'src/app/shared/interfaces';

@Component({
  selector: 'rdt-template-add-edit-form',
  templateUrl: './template-add-edit-form.component.html',
  styleUrls: ['./template-add-edit-form.component.scss'],
})
export class TemplateAddEditFormComponent implements OnInit, OnChanges {
  @Input()
  template: ITemplateWithIdDto | null = null;

  @Output()
  submitEvent = new EventEmitter();

  @Output()
  deleteEvent = new EventEmitter();

  fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formUtilsService: FormUtilsService
  ) {
    this.fg = this.fb.group({
      templateName: this.fb.control(''),
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.template) {
      const template: ITemplateWithIdDto = changes?.template?.currentValue;
      this.formUtilsService.setValues(this.fg, template);
    }
  }

  onSubmit(): void {
    this.formUtilsService.validate(this.fg);
    if (this.template && this.fg.valid) {
      const submit: ITemplateWithIdDto = {
        ...this.template,
        templateName: this.fg.get('templateName')?.value,
      };
      this.submitEvent.emit(submit);
    }
  }

  onDelete(): void {
    const id = this.template?.id;
    if (id) {
      this.deleteEvent.emit(id);
    }
  }
}
