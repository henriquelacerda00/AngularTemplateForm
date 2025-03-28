import { Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors,  } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ViacepService } from '../service/viacep.service';

@Directive({
  selector: '[validar-cep]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: ValidarCepDirective,
    multi: true
  }]
})

export class ValidarCepDirective implements AsyncValidator {
  
  constructor(private consultaCepService : ViacepService) { }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;
    return  this.consultaCepService.getConsultaCep(cep).pipe(map((resultado : any ) => resultado.erro ? {'validar-cep':true} : null
      
  ))
  }

}
