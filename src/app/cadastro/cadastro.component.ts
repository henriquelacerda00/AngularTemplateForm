import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm  } from '@angular/forms';
import { ViacepService } from '../service/viacep.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm! : FormGroup

  constructor(private router: Router , private cepService : ViacepService) { 
    
  }

  

  ngOnInit(): void {
    
  }

  cadastrar(form : NgForm){
    if(form.valid){
      this.router.navigateByUrl('/sucesso')
    }else{
      alert('Preencha os campos obrigatórios do formulário')
      Object.values(form.controls).forEach(control => {
        control.markAsTouched()})
    }
  }


  consultaCep(ev: any , f: NgForm){
    const cep = ev.target.value
    if(cep !== ""){
      this.cepService.getConsultaCep(cep).subscribe((resultado) => 
        {
        console.log(resultado);
        this.populandoEndereco(resultado, f);
      });
    } 
  }

  populandoEndereco(dados : any , f: NgForm) {
    f.form.patchValue({
      cep : dados.cep,
      bairro : dados.bairro,
      cidade : dados.localidade,
      estado: dados.uf,
      complemento: dados.complemento,
      endereco: dados.logradouro

    })
  }
  
  
}
