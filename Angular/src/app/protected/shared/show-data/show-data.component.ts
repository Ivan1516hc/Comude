import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.css']
})
export class ShowDataComponent {
  @Input() data: any;
  baseUrl = environment.dowload;

  constructor() { }

  limiteCaracteres: number = 50;
  isLongText(text: string): boolean {
    return text.length > this.limiteCaracteres;
  }

  // Esta función cambiará el estado del texto para mostrar o no mostrar todo el texto.
  toggleText(documento: any) {
    documento.mostrarTextoCompleto = !documento.mostrarTextoCompleto;
  }

}
