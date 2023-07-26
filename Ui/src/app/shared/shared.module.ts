import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaAutoresizeDirective } from './text-area-autoresize.directive';

@NgModule({
  declarations: [TextAreaAutoresizeDirective],
  imports: [CommonModule],
  exports: [TextAreaAutoresizeDirective],
})
export class SharedModule {}
