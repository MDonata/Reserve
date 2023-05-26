import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  gap = 16;

  carousel = document.getElementById('carousel');
  content = document.getElementById('content');
  next = document.getElementById('next');
  prev = document.getElementById('prev');
  width = this.carousel?.offsetWidth;

  constructor(public dialog: MatDialog) {}

  arr: string[] = [
    'https://cdn-icons-png.flaticon.com/512/756/756812.png',
    'https://cdn-icons-png.flaticon.com/512/3379/3379077.png',
    'https://cdn-icons-png.flaticon.com/512/1590/1590970.png',
    'https://cdn-icons-png.flaticon.com/512/195/195559.png',
    'https://cdn-icons-png.flaticon.com/512/5288/5288453.png',
    'https://cdn.iconscout.com/icon/free/png-256/basketball-nba-court-ground-olympic-game-sport-6-25652.png',
    'https://cdn-icons-png.flaticon.com/512/4500/4500081.png',
    'https://cdn-icons-png.flaticon.com/512/186/186192.png',
    'https://cdn-icons-png.flaticon.com/512/3787/3787310.png',
    'https://img.freepik.com/icones-gratis/boliche_318-196431.jpg',
    'https://cdn-icons-png.flaticon.com/512/566/566283.png',
    'https://cdn-icons-png.flaticon.com/512/195/195132.png',
    'https://img.freepik.com/icones-gratis/patim_318-317248.jpg',
  ];
  optionsArr = [
    {
      path: 'https://ecrie.com.br/sistema/conteudos/imagem/g_119_2_3_15022023204129.jpeg',
      title: 'Quadra de Futebol',
    },
    {
      path: 'https://www.recoma.com.br/blog/wp-content/uploads/2023/02/quadra-de-futsal-qual-o-melhor-piso-esportivo.jpg',
      title: 'Quadra de Poliesportiva',
    },
    {
      path: 'https://psdovidro.com.br/wp-content/uploads/2015/10/estudio-3.jpg',
      title: 'Salão de Dança',
    },
    {
      path: 'https://www.adec.com.br/admin/image/reserva_area/9/42lg.jpg',
      title: 'Quadra de Vôlei de Areia',
    },
  ];
  optionsArr2 = [
    {
      path: 'https://media.imperatriz.ma.gov.br/N8hB0ccJumWbIFR4WaXquGgCLAg=/750x0/novo.imperatriz.ma.gov.br/media/site/content/article/WhatsApp_Image_2021-01-28_at_16.52.32.jpeg',
      title: 'Quadra de Badminton',
    },
    {
      path: 'https://www.sescpr.com.br/wp-content/uploads/2020/11/20201001_173756.jpg',
      title: 'Quadra de Basquete',
    },
    {
      path: 'https://resinsa.com.br/wp-content/uploads/Foto-8-%E2%80%93-Pista-de-atletismo-Sandwich-System.png',
      title: 'Pista de Corrida',
    },
    {
      path: 'https://www.pardinisport.com.br/img/servicos/quadra-de-volei.jpg',
      title: 'Quadra de Vôlei',
    },
  ];
  totalCards: number = this.arr.length;
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
    this.cardsPerPage = this.getCardsPerPage();
    this.initializeSlider();
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
    return Math.floor(this.container.nativeElement.offsetWidth / 200);
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

  openLoginDialog(){
    this.dialog.open(LoginComponent, {
      data: { isCadastro: false },
      height: '450px',
      width: '800px',
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    }); */
  }

  openCadastroDialog(){
    this.dialog.open(LoginComponent, {
      data: { isCadastro: true },
      height: '450px',
      width: '800px',
    });
  }
}
