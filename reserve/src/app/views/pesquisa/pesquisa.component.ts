import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ReserveApiService } from 'src/app/services/reserve-api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  usuario?: string;
  sliderStart = 0;
  sliderEnd = 800;

  constructor(public dialog: MatDialog, private service: ReserveApiService, public route: Router) { }

  ngOnInit(): void {
    this.checarLogin();
  }

  openLoginDialog(){
    const dialogRef = this.dialog.open(LoginComponent, {
      data: { isCadastro: false },
      height: '450px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checarLogin();
    });
  }

  openCadastroDialog(){
    if(!this.usuario){
      const dialogRef = this.dialog.open(LoginComponent, {
        data: { isCadastro: true },
        height: '450px',
        width: '800px',
      });
      dialogRef.afterClosed().subscribe(result => {
        this.checarLogin();
      });
    }else{
      localStorage.removeItem('usuario');
      localStorage.clear();
      this.checarLogin();
    }
  }

  checarLogin(){
    let user = localStorage.getItem('usuario');
    if(user){
      this.usuario = user;
    }else{
      this.usuario = undefined;
    }
  }
}
