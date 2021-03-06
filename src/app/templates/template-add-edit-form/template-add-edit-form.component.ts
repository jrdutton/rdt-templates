import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtilsService } from '../../core/services';
import { ITemplateWithIdDto } from '../../shared/interfaces';

@Component({
  selector: 'rdt-template-add-edit-form',
  templateUrl: './template-add-edit-form.component.html',
  styleUrls: ['./template-add-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateAddEditFormComponent implements OnInit, OnChanges {
  @Input()
  template: ITemplateWithIdDto | null = null;

  @Output()
  submitEvent = new EventEmitter();

  @Output()
  deleteEvent = new EventEmitter();

  readOnly = true;

  fg: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formUtilsService: FormUtilsService
  ) {
    this.fg = this.fb.group({
      templateName: this.fb.control('', Validators.required),
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.template) {
      const template: ITemplateWithIdDto = changes?.template?.currentValue;
      this.readOnly = (template?.id || 0) > 0;
      this.formUtilsService.setValues(this.fg, template);
    }
  }

  onEdit(): void {
    this.readOnly = false;
  }

  onCancel(): void {
    this.readOnly = true;
    this.formUtilsService.setValues(this.fg, this.template);
  }

  onSubmit(): void {
    this.formUtilsService.validate(this.fg);
    if (this.template && this.fg.valid) {
      const submit: ITemplateWithIdDto = {
        ...this.template,
        templateName: this.fg.get('templateName')?.value,
      };
      this.submitEvent.emit(submit);
      const id = this.template?.id;
      if (id) {
        this.readOnly = true;
      }
    }
  }

  onDelete(): void {
    const id = this.template?.id;
    if (id) {
      this.deleteEvent.emit(id);
    }
  }
}
