import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [NavigationComponent],
  exports: [CommonModule, ReactiveFormsModule, NavigationComponent],
  imports: [CommonModule, RouterModule],
})
export class SharedModule {}
