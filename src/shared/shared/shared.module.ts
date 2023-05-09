import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from 'src/app/footer/footer.component';



@NgModule({
  declarations: [FooterComponent,FooterComponent],
  imports: [
    CommonModule
  ],
  exports:[FooterComponent]
})
export class SharedModule { }
