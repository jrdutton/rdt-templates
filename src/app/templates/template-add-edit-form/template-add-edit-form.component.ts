import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITemplateWithIdDto } from 'src/app/shared/interfaces';

@Component({
  selector: 'rdt-template-add-edit-form',
  templateUrl: './template-add-edit-form.component.html',
  styleUrls: ['./template-add-edit-form.component.scss'],
})
export class TemplateAddEditFormComponent implements OnInit {
  @Input()
  template: ITemplateWithIdDto | null = null;

  @Output()
  submitEvent = new EventEmitter();

  @Output()
  deleteEvent = new EventEmitter();

  fg: FormGroup;

  constructor(private fb: FormBuilder) {
    this.fg = this.fb.group({});
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.template) {
      this.submitEvent.emit(this.template);
    }
  }

  onDelete(): void {
    const id = this.template?.id;
    if (id) {
      this.deleteEvent.emit(id);
    }
  }
}
