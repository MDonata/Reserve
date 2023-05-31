import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { ReserveApiService } from 'src/app/services/reserve-api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Quadra } from 'src/app/models/quadra.model';
import { Search } from 'src/app/models/searchData.model';
import { TipoQuadra } from 'src/app/models/tipoQuadra.enum';

@Component({
  selector: 'app-pesquisa',
  templateUrl: './pesquisa.component.html',
  styleUrls: ['./pesquisa.component.css']
})
export class PesquisaComponent implements OnInit {
  usuario?: string;
  sliderStart = 0;
  sliderEnd = 800;
  quadras: Quadra[] = [];
  title: string[] = [];
  searchText: string = '';
  currentSearchText: string = '';

  constructor(public dialog: MatDialog,
    private service: ReserveApiService,
    public route: Router,
    private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.checarLogin();
    this.ActivatedRoute.queryParams.subscribe(async (params) => {
      if(params){
        let searchData = new Search();
        searchData.Texto = params['searchText'];
        this.currentSearchText = params['searchText'];

        this.service.getQuadrasList(searchData).subscribe(data => { 
          this.quadras = data;
          this.title = data.map(q => { return TipoQuadra[q.tipo] });
        });
      }
    });
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

  showReserva(id: string | number){
    let quadra = this.quadras.find(q => q.id == id);
    if(quadra){
      this.route.navigate(['reserva'],{
        queryParams:{
          id: quadra.id,
          id_fornecedor: quadra.id_Fornecedor,
          title: TipoQuadra[quadra.tipo],
          preco: quadra.precoHora,
          estado: quadra.estado,
          cidade: quadra.cidade,
          tipo: quadra.tipo,
          descricao: quadra.descricao,
          endereco: quadra.endereco,
          itens: quadra.items,
          imgPrincipal: quadra.imgPrincipal,
        },
      });
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

  homeNavigate(){
    this.route.navigate(['home'],{});
  }
}
