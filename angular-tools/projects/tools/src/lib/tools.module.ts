import { NgModule } from '@angular/core';
import { AutofocusDirective } from './autofocus.directive';
import { EllipsisPipe } from './ellipsis.pipe';
import { ToolsComponent } from './tools.component';

@NgModule({
  declarations: [ToolsComponent, EllipsisPipe, AutofocusDirective],
  imports: [],
  exports: [ToolsComponent, EllipsisPipe, AutofocusDirective],
})
export class ToolsModule {}
