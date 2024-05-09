import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mexicanCurrency'
})
export class MexicanCurrencyPipe implements PipeTransform {

  transform(value: string | number, currencyCode: string = 'MXN'): string | null {
    if (value == null || isNaN(parseFloat(value.toString()))) {
      return '0'; // Devuelve '0' si el valor es nulo, indefinido o no es un número válido
    }

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    // Formateamos el número manualmente con coma como separador de miles y punto como separador decimal
    const formattedValue = this.formatNumber(numericValue);

    return `${formattedValue} ${currencyCode}`;
  }

  private formatNumber(value: number): string {
    const parts = value.toFixed(2).split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const decimalPart = parts[1];

    return `${integerPart}.${decimalPart}`;
  }
}
