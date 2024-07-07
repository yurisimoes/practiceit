import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaAutoresizeDirective } from './text-area-autoresize.directive';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [TextAreaAutoresizeDirective, DeleteDialogComponent],
  imports: [CommonModule],
  exports: [TextAreaAutoresizeDirective, DeleteDialogComponent],
})
export class SharedModule {}
