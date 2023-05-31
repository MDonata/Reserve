import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { Quadra } from 'src/app/models/quadra.model';
import { ReserveApiService } from 'src/app/services/reserve-api.service';
import { Imagem } from 'src/app/models/imagem.model';
import { AgendamentoComponent } from '../agendamento/agendamento.component';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  imagens: string[] = [];

  usuario?: string;
  title: string = '';
  quadra: Quadra = new Quadra();
  itensArray: string[] = [];
  searchText: string = '';


  constructor( public route: Router,
    public dialog: MatDialog,
    private ActivatedRoute: ActivatedRoute,
    private service: ReserveApiService) { }

  ngOnInit(): void {
    this.checarLogin();
    this.ActivatedRoute.queryParams.subscribe(async (params) => {
      if(params){
        this.title = params['title'];
        this.quadra = {
          id: params['id'],
          id_Fornecedor: params['id_fornecedor'],
          estado: params['estado'],
          cidade: params['cidade'],
          precoHora: params['preco'],
          tipo: params['tipo'],
          descricao: params['descricao'],
          endereco: params['endereco'],
          items: params['itens'],
          imgPrincipal: params['imgPrincipal'],
        }
        this.itensArray = params['itens']?.split(', ');
        this.getImages(params['id']);
      }
    });
  }

  getImages(id: number|string){
    this.service.getImagensListById(id).subscribe(data => { 
      data.forEach((img: Imagem) => {
        this.imagens.push(img.link);
      });
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

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

  searchNavigate(){
    if(this.searchText){
      this.route.navigate(['pesquisa'],{
        queryParams:{
          searchText: this.searchText
        },
      });
    }
  }

  openAgendamentoDialog(){
    const dialogRef = this.dialog.open(AgendamentoComponent, {
      data: { quadraId: this.quadra.id, precoHora: this.quadra.precoHora },
      height: '590px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.checarLogin();
    });
  }

  homeNavigate(){
    this.route.navigate(['home'],{});
  }
}
