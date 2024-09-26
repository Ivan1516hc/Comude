import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Requests } from '../../interfaces/requests-interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AllService } from '../../services/all.service';


import * as XLSX from 'xlsx';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['../validation/validation.component.css']
})
export class AppraisalComponent {
  request: Requests;
  hayError: boolean = false;
  data: any = [];
  headers = ['No.', 'Folio', 'Solicitante', 'Disciplina', 'Tipo', 'Fecha', 'Monto', 'Status', 'Acciones'];
  updatedData: any = [];
  reason: string = '';


  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder, private allService: AllService, private elementRef: ElementRef) {
    this.searchTermChanged.pipe(
      debounceTime(1000) // Cambia este valor según el tiempo que desees esperar después de escribir
    ).subscribe(() => {
      // Realiza la acción deseada aquí, como realizar una búsqueda
      this.realizarBusqueda();
    });
  }

  ngOnInit(): void {
    this.initTable();
  }

  recargarDatosTabla() {
    this.initTable();
  }

  // Función para manejar el cambio de página
  onPageChange(data: any): void {
    const url = `${data}`;
    const res = this.http.get(url);
    res.subscribe({
      next: (response) => {
        this.data = response;
      }
    })
  }

  private initTable() {
    this.allService.showAppraisal().subscribe({
      next: (request) => {
        this.request = request;
        this.data = this.request;
      }, error: () => {
        this.hayError = true;
      }
    });
  }

  id: any = null;
  baseUrl = environment.dowload;

  searchTerm: any = '';
  searchTermChanged: Subject<string> = new Subject<string>();

  realizarBusqueda() {
    this.allService.searchValueAppresial(this.searchTerm).subscribe({
      next: (res) => {
        this.data = res;
      }
    })
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTermChanged.next(searchTerm);
  }

  search(value: any) {
    if (value == 1) {
      return this.initTable();
    }
    this.allService.search(value).subscribe({
      next: (res) => {
        this.data = res;
      }
    })
  }

  selectLocation: any = "";
  selectCreche: any = "";
  creches: any = [];
  dataShow: any;
  motivoMessage: any = '';
  motivosMessage: any = '';
  newMessage: string = '';
  lugarCorreccion: any = '';
  historyMessages: any = [];
  showHistory: boolean = false;
  typeForms: any = [];
  ExcelData: any = [];
  // Obtener la fecha actual en formato ISO (por ejemplo, "2023-09-15")
  currentDate = new Date().toISOString().split('T')[0];

  // Función para calcular la fecha mínima permitida (día siguiente a la fecha actual)
  minDate() {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1); // Obtener el día siguiente
    return tomorrow.toISOString().split('T')[0];
  }

  miFormularioExport: FormGroup = this.fb.group({
    begin: ['', [Validators.required]],
    finish: ['', [Validators.required]]
  });

  miFormulariAssignment: FormGroup = this.fb.group({
    request_id: ['', [Validators.required]],
    invoice: ['', [Validators.required]],
    approved_budget: ['', [Validators.required]]
  });

  toggleHistory(): void {
    this.showHistory = !this.showHistory;
  }

  showPdf(id: any) {
    this.router.navigateByUrl('/guarderia/solicitudes/' + id);
  }

  openNewTab(url: string) {
    window.open(url, '_blank');
  }

  changeStatus(data: any) {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea ' + (data.status_request_id == 3 ? 'aceptar' : (data.status_request_id == 4 ? 'rechazar' : (data.status_request_id == 2 ? 'reactivar' : ''))) + ' esta solicitud?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.allService.updateRequest(data).subscribe(response => {
          if (response.code == 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 2000
            })
            this.initTable()
            // this.citaCreada.emit();
          } else {
            Swal.fire("Error", "error")
          }
        })
      } else if (result.isDenied) {
        return;
      }
    })
  }


  shouldApplyStripedClass(index: number): boolean {
    // Implementa tu lógica para decidir si aplicar la clase striped
    // Puedes basarte en el índice o en cualquier otra lógica que necesites.
    return index % 2 === 0; // Alternar colores en base al índice
  }

  cerrarModal() {
    const botonCancel: any = this.elementRef.nativeElement.querySelector('#cancel');
    botonCancel.click();
  }

  // Método para formatear la fecha en formato día-mes-año
  formatDate(date: Date): string {
    const dateObject = new Date(date);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  }

  // Método para formatear la hora en formato 12 horas
  formatTime(date: string): string {
    const [hourStr, minutesStr] = date.split(':'); // Dividir la cadena en horas y minutos
    let hour = parseInt(hourStr);
    let zone = 'AM';

    // Determinar si es AM o PM
    if (hour >= 12) {
      zone = 'PM';
      hour = hour === 12 ? hour : hour - 12; // Convertir horas de 24 a 12 horas
    }

    // Ajustar la hora si es medianoche (hora 0)
    if (hour === 0) {
      hour = 12;
    }

    return `${hour}:${minutesStr} ${zone}`;
  }



  /*** FUNCION PARA LEER EXCEL */
  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = () => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      /// iterar para agregar campo confirmed
      for (let item of this.ExcelData) {
        item.confirmed = false;
      }

      // Modificar solo los nombres de las columnas y eliminar acentos
      this.ExcelData = this.ExcelData.map((item: any) => {
        const newItem: any = {};
        for (const key in item) {
          const newKey = this.removeAccents(key.replace(/ /g, '_').toLowerCase()); // Eliminar acentos en las columnas
          newItem[newKey] = item[key]; // Mantener los valores sin cambios
        }
        console.log(newItem);
        return newItem;
      });
    };
  }

  getColumns(): string[] {
    // Obtener todas las claves únicas de los objetos en el JSON
    const allColumn = this.ExcelData.reduce((columns: string[], item: any) => {
      return columns.concat(Object.keys(item));
    }, [])
      .filter((column: string, index: number, self: string[]) => self.indexOf(column) === index);
    return allColumn;
  }

  exportComite() {
    if (this.miFormularioExport.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes de seleccionar un rango de fechas para poder exportar el reporte.',
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }

    this.allService.exportComite(this.miFormularioExport.value).subscribe({
      next: (response) => {
        this.cerrarModal();
        this.downLoadFile(response, "application/ms-excel", "reporte-comite.xlsx");
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  downLoadFile(data: any, type: string, fileName: string) {
    let blob = new Blob([data], { type: type },);
    const objectUrl: string = URL.createObjectURL(blob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
  }

  getTotalAprobado(): number {
    let total = 0;
    for (const item of this.ExcelData) {
      if (item.confirmed) {
        total += item.monto_aprobado;
      }
    }
    return total;
  }
  selectData(id: number) {
    this.allService.getFormData(id).subscribe({
      next: (response) => {
        this.dataShow = response;
      }
    });
  }

  clearDataExport() {
    this.ExcelData = [];
  }

  updateConfirmedValue(item: any, event: Event) {
    const target = event.target as HTMLInputElement;
    item.confirmed = target.checked;
  }

  /*** FUNCION PARA REMOVER ACENTOS SOLO EN NOMBRES DE COLUMNAS */
  removeAccents(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }


  updateInputValue(item: any) {
    // Aquí actualizas el valor del input según la lógica que necesites
    const inputValue = ''; // Aquí debes definir la lógica para obtener el valor adecuado
    // Puedes asignar el valor directamente a una propiedad del objeto item si es necesario
    item.inputValue = inputValue;
  }
  selectAll() {
    for (const item of this.ExcelData) {
      item.confirmed = true;
    }
  }

  deselectAll() {
    for (const item of this.ExcelData) {
      item.confirmed = false;
    }
  }

  importComite() {
    // console.log(this.ExcelData);
    const total = this.getTotalAprobado();
    if (total == 0 || total == null) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes de confirmar al menos un registro para poder importar los datos.',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea importar los datos?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.allService.importComite(this.ExcelData).subscribe({
          next: (response) => {
            this.updatedData = response?.datos_actualizados ?? [];
            if (response.code == 200) {
              // this.cerrarModal();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${response?.message}`,
                showConfirmButton: true,
                didClose: () => {
                  this.cerrarModal();
                }
              });
              this.ExcelData = response.valores;
              this.initTable();
            } else {
              let html = `<p style="font-weight: bold; color: red;">${response.message}</p>`;
              Swal.fire({
                position: 'center',
                icon: 'info',
                title: 'Error al importar los datos',
                html: html,
                showConfirmButton: true,
              });
              this.ExcelData = response.valores;
              this.initTable();
            }
          },
          error: (err) => {
            this.initTable();
          }
        });
      } else if (result.isDenied) {
        return;
      }
    });
  }

  getInvoice(item: any) {
    this.miFormulariAssignment.patchValue({
      invoice: item.invoice,
      request_id: item.id
    });
  }

  declineRequest() {
    if (this.reason == '') {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes de escribir un motivo para poder rechazar la solicitud.',
        showConfirmButton: true
      })
      return;
    }
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea rechazar esta solicitud? por el motivo de: ' + this.reason,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        // let data = { 'id': this.dataShow?.general?.id, 'status_request_id': 7, 'reason': this.reason };
        let data = { 'id': 1, 'status_request_id': 7, 'reason': this.reason };
        this.allService.updateRequest(data).subscribe(response => {
          if (response.code == 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 2000
            })
            this.reason = '';
            this.cerrarModal();
            this.initTable()
          } else {
            Swal.fire("Error", "error")
          }
        })
      } else if (result.isDenied) {
        return;
      }
    })
  }


  assignmentComite() {
    if (this.miFormulariAssignment.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes de ingresar un presupuesto para poder asignarlo a la solicitud.',
        showConfirmButton: true
      })
      return;
    }
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea asignar el presupuesto del comité a esta solicitud?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.allService.assignmentComite(this.miFormulariAssignment.value).subscribe(response => {
          if (response.code == 200) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 2000
            })
            this.cerrarModal();
            this.initTable();
            // this.citaCreada.emit();
          } else {
            Swal.fire("Error", "error")
          }
        })
      } else if (result.isDenied) {
        return;
      }
    })
  }

  limiteCaracteres: number = 50;
  isLongText(text: string): boolean {
    return text.length > this.limiteCaracteres;
  }
  // Esta función cambiará el estado del texto para mostrar o no mostrar todo el texto.
  toggleText(documento: any) {
    documento.mostrarTextoCompleto = !documento.mostrarTextoCompleto;
  }

}