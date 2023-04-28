import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

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

  constructor() {}

  arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  optionsArr: number[] = [1, 2, 3, 4];
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
}
