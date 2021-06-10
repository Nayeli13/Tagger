import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

//form
import {AbstractControl,FormArray,FormControl,ValidationErrors,Validators} from '@angular/forms';
import { CodesValidators } from './validators/codes-validators';



@Component({
  selector: 'app-add-codes',
  templateUrl: './add-codes.component.html',
  styleUrls: ['./add-codes.component.scss'],
})
export class AddCodesComponent implements OnInit {
  
  @Input() searchStatus!: boolean; //indica cuando se ha realizado la busqueda
  @Output() codes = new EventEmitter<Array<string>>(); //emite los array ingresados al componente padre.
  @Output() getSearchStatusChange = new EventEmitter<boolean>();

  articleCodes = new FormArray([]); //Array con todos los codigos ingresados y sus validaciones.
  codesEntered = new FormControl(''); //cadena de texto con los codigos separados por coma.

  codeErrors:string[]= []; //Contiene los errores en las validaciones de los codigos.

  constructor() {}

  ngOnInit(): void {}

  /**
   * Agrega los codigos al formArray para ser validados.
   * @param code contiene el valor del codigo ingresado.
   */
  addCodes(code: string): void {
    this.articleCodes.push(new FormControl(code));
  }

  /**
   * Elimina todos los codigos
   * @param formArray formArray con los codigos y las validaciones
  */
   clearFormArray(formArray: FormArray){
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }
  /**
   * Reinicia el array de los codigos y el input
   * @param Codigo contiene el valor del codigo ingresado
  */
  resetCodes(codesInput?:boolean){
    if(codesInput){
      codesInput && this.codesEntered.setValue('');
      this.getSearchStatusChange.emit(false);
    }
  }

  /**
   * Establece las validaciones de los codigos
   * @param Codigo contiene el valor del codigo ingresado
  */
  setCodeValidators(code: AbstractControl): void {
    code?.setValidators(
      Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
        CodesValidators.patternValidator(/^-?(0|[0-9]\d*)?$/, {
          onlyNumber: true,
        }),
      ])
    );

    code.updateValueAndValidity();
  }

  /**
   * Agrega los errores encontrados en las validaciones al array codeErrors
   * @param errors el valor del codigo ingresado
  */
  addCodeErrors(errors:ValidationErrors | null) {

    const errorsMensagge:any = {
      minlength: 'La cantidad minima de caracteres es 8',
      maxlength: 'La cantidad maxima de caracteres es 8',
      onlyNumber: 'Los codigos no contienen letras ni caracteres especiales',
      required: 'Debe ingresar un Codigo, para realizar la busqueda',
    };
   
    if(errors){
      for (let error of Object.keys(errors)) {  
        this.codeErrors = [ 
          ...this.codeErrors, 
          errorsMensagge[error]
        ];
      }
    }
  }

   /**
   * Elimina los puntos y espacios de la cadena
   * @param codes cadena de todos los codigos
  */
  cleanCodes(codes: string){
    return codes.replace(/\./g, '').replace(/\s+/g, '').trim();
  }

  /**
   * Elimina los elementos duplicados
   * @param array 
  */
  removeDuplicates(array:Array<any>):Array<any>{
    return Array.from(new Set(array));
  }
  /**
   * Procesa la cadena de texto con todos los codigos en un array 
  */
  processCodes() {
    
    //parsea los datos
    this.codesEntered.setValue(this.cleanCodes(this.codesEntered.value));

    //Separa los codigos y los coloca en un array
    const codesEntered: Array<string> = this.codesEntered.value.split(',');

    //Reiniciar valores 
    this.clearFormArray(this.articleCodes)
    this.codeErrors = []

    //Agrega los codigos al Array 
    codesEntered.map((code) => this.addCodes(code));

    //Agrega las validaciones y los errores correspondientes
    this.articleCodes.controls.forEach((control) => {
      this.setCodeValidators(control);
      this.addCodeErrors(control?.errors);
    });

    //Elimina los elementos duplicados
    this.codeErrors = this.removeDuplicates(this.codeErrors);

    //Emite los codigos parseados al componente padre 
    this.articleCodes.valid && this.codes.emit(this.removeDuplicates(this.articleCodes.value));
  }
}
