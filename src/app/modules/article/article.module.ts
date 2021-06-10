import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//components
import { AddCodesComponent } from './add-codes/add-codes.component';
import { ArticleComponent } from './article.component';
//form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//material
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { CheckResultComponent } from './check-result/check-result.component';
import { ShareComponentsModule } from 'src/app/share-components/share-components.module';

@NgModule({
  declarations: [
    AddCodesComponent,
    ArticleComponent,
    CheckResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    ShareComponentsModule
  ],
  exports:[AddCodesComponent,CheckResultComponent]
})
export class ArticleModule { }
