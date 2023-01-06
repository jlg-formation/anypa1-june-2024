import { NgModule } from '@angular/core';
import { ToolsComponent } from './tools.component';
import { EllipsisPipe } from './ellipsis.pipe';



@NgModule({
  declarations: [
    ToolsComponent,
    EllipsisPipe
  ],
  imports: [
  ],
  exports: [
    ToolsComponent,
    EllipsisPipe
  ]
})
export class ToolsModule { }
