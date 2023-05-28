import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
/* import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
 */
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  /* galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = []; */

  imagens: string[] = [
    'https://www.silvergold.com.br/imagens/informacoes/aluguel-quadra-futsal-preco-03.jpg',
    'https://www.silvergold.com.br/imagens/informacoes/aluguel-quadra-futsal-preco-04.jpg',
    'https://www.silvergold.com.br/imagens/informacoes/aluguel-quadra-futsal-preco-05.jpg',
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    /* this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = [
      {
          small: 'assets/1-small.jpg',
          medium: 'assets/1-medium.jpg',
          big: 'assets/1-big.jpg'
      },
      {
          small: 'assets/2-small.jpg',
          medium: 'assets/2-medium.jpg',
          big: 'assets/2-big.jpg'
      },
      {
          small: 'assets/3-small.jpg',
          medium: 'assets/3-medium.jpg',
          big: 'assets/3-big.jpg'
      }
  ]; */
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
