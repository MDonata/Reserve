import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Horarios } from 'src/app/models/horarios.enum';
import { DialogData } from '../login/login.component';
import { ReserveApiService } from 'src/app/services/reserve-api.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {
  selectedDate: any;

  toppings = this._formBuilder.group({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false,
    21: false,
    22: false,
    23: false,
    24: false,
  });

  constructor(public dialogRef: MatDialogRef<AgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AgendamentoData,
     private service: ReserveApiService,
     private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data.precoHora);
  }

  getEnumValue(i: number){
    return Horarios[i];
  }

  onSelect(event: any){
    
    this.selectedDate = event;
  }

  calculaPreco():number{
    let preco: number = 0;

    for (let i = 1; i <= 24; i++) {
      if(this.toppings.value[i]){
        preco = preco + Number(this.data.precoHora);
      }
    }
    
    return preco;
  }

  confirmaAgendamento(){

  }
}

export interface AgendamentoData {
  quadraId: number | string;
  precoHora: number;
}
