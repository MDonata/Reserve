import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.model';
import { ReserveApiService } from 'src/app/services/reserve-api.service';

export interface DialogData {
  isCadastro: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  nome: string = '';
  email: string = '';
  senha: string = '';

  constructor(public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
     private service: ReserveApiService) { }

  ngOnInit(): void {
  }

  logarCadastrar(){
    if(this.data.isCadastro){
      this.cadastrar();
    }else{
      this.logar();
    }
  }

  logar(){
    if(this.email && this.senha){
        this.service.getUsuarioByLogin(this.email, this.senha).subscribe((data: Usuario) => { 
          localStorage.setItem('usuario', data.nome);
          this.dialogRef.close();
        },
        (error) => {
          alert('Email ou senha incorretos');
        });
    }else{
      if(!this.email){
        alert('Insira o email para logar');
      }else{
        alert('Insira a senha para logar');
      }
    }
  }

  cadastrar(){
    if(this.nome && this.email && this.senha){
      let cadUsuario: Usuario = {
        email: this.email,
        nome: this.nome,
        senha: this.senha,
        tipo: 1,        
      };
      this.service.postUsuario(cadUsuario).subscribe(() => { 
        alert('Usuário Adicionado com sucesso!');
        localStorage.setItem('usuario', this.nome);
        this.dialogRef.close();
      },
      (error) => {
        alert('Ocorreu um erro');
      });
    }else{
      if(!this.email){
        alert('Insira o email para cadastrar');
      }else if(!this.senha){
        alert('Insira a senha para cadastrar');
      }else{
        alert('Insira o nome para cadastrar');
      }
    }
  }

  changePopUp(){
    this.data.isCadastro = !this.data.isCadastro
  }

}
