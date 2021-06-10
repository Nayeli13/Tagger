import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [CardCarouselComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports:[CardCarouselComponent]
})
export class ShareComponentsModule { }
