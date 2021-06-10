import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { checkResult } from './models/article';
import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  
  //codigos validos e invalidos filtrados
  checkResult: checkResult | any = {
    validArticles: [],
    invalidArticles: [],
  };

  submit = false;
  spinner = false;

  constructor(
    private articleService: ArticleService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

   /**
   * Agrega los codigos al array correspondiente
   * @param valid determina si el codigo es valido o no
   * @param code 
   */
  addArticles(valid: boolean, code: string) {
    
    const key = valid ? 'validArticles' : 'invalidArticles';
    this.checkResult[key].push(code)
  }

  /**
   * Filtra los codigos en validos e invalidos
   * @param code contiene el valor del codigo ingresado.
   */
  filterArticles(currentArticles: string[], codes: string[]) {
    codes.map((code: string) => {
      const validCode = currentArticles.some((codes) => codes === code);
      this.addArticles(validCode, code);
    });
    console.log(this.checkResult)
  }

  /**
   * Obtiene el mensaje de error del endpoint
   * @param code contiene el valor del codigo ingresado.
  */
  getError() {
    this.setSearchStatus(false);
    this.spinner = false;
    this._snackBar.open(
      'Hubo un error en el servidor, intentelo mas tarde',
      'cerrar'
    );
  }

  /**
   * Consulta el endpoint para verificar los codigos
   * @param code contiene el valor del codigo ingresado.
   */
  checkArticleCodes(codes: string[]) {

    //Inicializa la busqueda
    this.setSearchStatus(true);
    this.spinner = true;

    //Obtiene los articulos desde el endpoint
    this.articleService.getArticleCodes().subscribe(
      (currentArticles: string[]) => {
       
        this.checkResult.validArticles = [];
        this.checkResult.invalidArticles = [];

        this.filterArticles(currentArticles, codes);
        this.spinner = false;
      },
      () => this.getError()
    );
  }

  /**
   * envia el nuevo estado de la busqueda
   * @param code contiene el valor del codigo ingresado.
   */
  setSearchStatus(event: boolean) {
    this.submit = event;
  }
}
