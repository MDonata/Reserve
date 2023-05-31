import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ReserveApiService } from 'src/app/services/reserve-api.service';
import { Observable, lastValueFrom } from 'rxjs';
import { Quadra } from 'src/app/models/quadra.model';
import { TipoQuadra } from 'src/app/models/tipoQuadra.enum';
import { OptionsArray, SliderArray } from 'src/app/models/options.model';
import { Router } from '@angular/router';
import { Search } from 'src/app/models/searchData.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  quadrasList: Quadra[] = [];
  gap = 16;

  searchText: string = '';
  usuario?: string;
  carousel = document.getElementById('carousel');
  content = document.getElementById('content');
  next = document.getElementById('next');
  prev = document.getElementById('prev');
  width = this.carousel?.offsetWidth;

  constructor(public dialog: MatDialog, private service: ReserveApiService, public route: Router) {}

  mapa: string = 'https://i.blogs.es/09af6a/google_maps/840_560.jpg'
  sliderArray: SliderArray[] = [
    {path: 'https://cdn-icons-png.flaticon.com/512/756/756812.png', tipo: 10},
    {path: 'https://cdn-icons-png.flaticon.com/512/3379/3379077.png', tipo: 2},
    {path: 'https://cdn-icons-png.flaticon.com/512/1590/1590970.png', tipo: 8},
    {path: 'https://cdn-icons-png.flaticon.com/512/195/195559.png', tipo: 7},
    {path: 'https://cdn-icons-png.flaticon.com/512/5288/5288453.png', tipo: 6},
    {path: 'https://cdn.iconscout.com/icon/free/png-256/basketball-nba-court-ground-olympic-game-sport-6-25652.png', tipo: 3},
    {path: 'https://cdn-icons-png.flaticon.com/512/4500/4500081.png', tipo: 11},
    {path: 'https://cdn-icons-png.flaticon.com/512/186/186192.png', tipo: 12},
    {path: 'https://cdn-icons-png.flaticon.com/512/3787/3787310.png', tipo: 0},
    {path: 'https://img.freepik.com/icones-gratis/boliche_318-196431.jpg', tipo: 0},
    {path: 'https://cdn-icons-png.flaticon.com/512/566/566283.png', tipo: 0},
    {path: 'https://cdn-icons-png.flaticon.com/512/195/195132.png', tipo: 0},
    {path: 'https://img.freepik.com/icones-gratis/patim_318-317248.jpg', tipo: 0}
  ];
  optionsArr: OptionsArray[] = [];
  optionsArr2: OptionsArray[] = [];
  totalCards: number = this.sliderArray.length;
  currentPage: number = 1;
  pagePosition: string = '0%';
  cardsPerPage!: number;
  totalPages!: number;
  overflowWidth!: string;
  cardWidth!: string;
  containerWidth!: number;
  @ViewChild('container', { static: true, read: ElementRef })
  container!: ElementRef;
  @HostListener('window:resize') windowResize() {
    let newCardsPerPage = this.getCardsPerPage();
    if (newCardsPerPage != this.cardsPerPage) {
      this.cardsPerPage = newCardsPerPage;
      this.initializeSlider();
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.populatePagePosition();
      }
    }
  }

  ngOnInit() {
    this.loadData();
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
    this.checarLogin();
  }

  async loadData(){
    this.service.getQuadrasList().subscribe(data => { 
      this.quadrasList = data;
      this.quadrasList.forEach((quadra: Quadra) => {
        let title = TipoQuadra[quadra.tipo];
        let img = quadra.imgPrincipal;
        if(this.optionsArr.length < 4){
          this.optionsArr.push({
            id: quadra.id,
            path: img ? img : '',
            title: title,
          });
        }else if(this.optionsArr2.length < 4){
          this.optionsArr2.push({
            id: quadra.id,
            path: img ? img : '',
            title: title,
          });
        }
      });
      console.log(this.optionsArr);
    });
  }

  initializeSlider() {
    this.totalPages = Math.ceil(this.totalCards / this.cardsPerPage);
    this.overflowWidth = `calc(${this.totalPages * 100}% + ${
      this.totalPages * 10
    }px)`;
    this.cardWidth = `calc((${100 / this.totalPages}% - ${
      this.cardsPerPage * 10
    }px) / ${this.cardsPerPage})`;
  }

  getCardsPerPage() {
    return Math.floor(this.container.nativeElement.offsetWidth / 170);
  }

  changePage(incrementor: any) {
    this.currentPage += incrementor;
    this.populatePagePosition();
  }

  populatePagePosition() {
    this.pagePosition = `calc(${-100 * (this.currentPage - 1)}% - ${
      10 * (this.currentPage - 1)
    }px)`;
  }

  showReserva(id: string | number){
    let quadra = this.quadrasList.find(q => q.id == id);
    console.log(quadra);
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

  sliderNavigate(tipo: number){
    if(tipo){
      this.route.navigate(['pesquisa'],{
        queryParams:{
          searchText: TipoQuadra[tipo]
        },
      });
    }
  }

  homeNavigate(){
    this.route.navigate(['home'],{});
  }
}
