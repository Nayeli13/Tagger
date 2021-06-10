import {Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss']
})
export class CardCarouselComponent implements OnInit {

  @Input() codes!:string[];
  @Input() id!: string;
  @Input() totalItems:number = 1

  page: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.getTotalItems();
  } 

  //obtiene el numero total de codigos
  getTotalItems(){
    this.totalItems = Number(this.codes.length);
  }

}
