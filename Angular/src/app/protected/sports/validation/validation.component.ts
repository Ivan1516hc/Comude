import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { Requests } from '../../interfaces/requests-interface';
import { Subject, debounceTime } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllService } from '../../services/all.service';
import { environment } from 'src/environments/environment';
import { differenceInDays, differenceInMonths, differenceInYears, parse } from 'date-fns';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent {
  request: Requests;
  hayError: boolean = false;
  data: any = [];
  headers = ['No.', 'Folio', 'Solicitante', 'Disciplina', 'Tipo', 'Fechas', 'Enviada', 'Estado'];


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

    this.allService.getCatalogs().subscribe({
      next: (response) => {
        this.catalogo = response;
      }, error: (err) => {
        console.log(err);
      }
    })
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
    this.allService.indexRequest().subscribe({
      next: (request) => {
        this.request = request;
        this.data = this.request;
        console.log(request);
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
    // this.crecheService.searchValue(this.searchTerm).subscribe({
    //   next: (res) => {
    //     this.data = res;
    //   }
    // })
  }

  onSearchTermChange(searchTerm: string) {
    this.searchTermChanged.next(searchTerm);
  }

  search(value: any) {
    // this.crecheService.search(value).subscribe({
    //   next: (res) => {
    //     this.data = res;
    //   }
    // })
  }

  calculateAge(dateOfBirth: string): string {
    const parsedDateOfBirth = parse(dateOfBirth, 'yyyy-MM-dd', new Date());
    const currentDate = new Date();
    const years = differenceInYears(currentDate, parsedDateOfBirth);
    const months = differenceInMonths(currentDate, parsedDateOfBirth) % 12;
    const days = differenceInDays(currentDate, parsedDateOfBirth) % 30;
    let ageString = '';
    if (years > 0) {
      ageString += `${years} ${years === 1 ? 'AÑO' : 'AÑOS'}`;
    }
    if (months > 0) {
      ageString += `${ageString ? ', ' : ''}${months} ${months === 1 ? 'MES' : 'MESES'}`;
    }
    if (days > 0) {
      ageString += `${ageString ? ' Y ' : ''}${days} ${days === 1 ? 'DÍA' : 'DÍAS'}`;
    }
    return ageString;
  }

  locations: any = null;
  catalogo: any = null;
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
  showCatalogo: any = {};

  // Obtener la fecha actual en formato ISO (por ejemplo, "2023-09-15")
  currentDate = new Date().toISOString().split('T')[0];

  // Función para calcular la fecha mínima permitida (día siguiente a la fecha actual)
  minDate() {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1); // Obtener el día siguiente
    return tomorrow.toISOString().split('T')[0];
  }

  miFormulario: FormGroup = this.fb.group({
    request_id: [this.id, [Validators.required]],
    attended: [2, [Validators.nullValidator]],
    date: ['', [Validators.required]],
    hour: ['', [Validators.required]]
  });
  miFormularioExport: FormGroup = this.fb.group({
    begin: ['2024-01-01', [Validators.required]],
    finish: ['2024-05-01', [Validators.required]]
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

  schedule(): any {
    if (this.miFormulario.value.date == '' || this.miFormulario.value.date == '') {
      return Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Debes de ingresar fecha y hora para la cita.',
        showConfirmButton: false,
        timer: 3000
      })
    }
    const data = this.miFormulario.value;

    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea agendar cita el día ' + this.formatDate(data.date) + ' en horario de ' + this.formatTime(data.hour) + ' para esta solicitud?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.allService.createQuote(data).subscribe({
          next: (response) => {
            if (response.code == 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
              })
              // this.citaCreada.emit();
              this.cerrarModal();
            }
          }, error: (error) => {
            Swal.fire("Error", "error")
          }
        })
      } else if (result.isDenied) {
        return;
      }
    })
  }

  getRequest(item: any) {
    this.miFormulario.patchValue({
      request_id: item.id
    });
    this.allService.getForms().subscribe({
      next: (res) => {
        this.typeForms = res;
      }, error: (err) => {
        console.log(err);
      }
    });
    this.allService.historyMessage(item.id).subscribe({
      next: (response) => {
        this.motivosMessage = response.message_motive;
        this.historyMessages = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.id = item;
  }

  selectData(id: number) {
    this.allService.getFormData(id).subscribe({
      next: (response) => {

        this.dataShow = response;
        let dependencia = this.catalogo.dependencias.find(elemento => elemento.id == this.dataShow.parents[0].economic[0].lugar_trabajo);
        let escolaridad = this.catalogo.escolaridad.find(elemento => elemento.id == this.dataShow.parents[0].escolaridad);
        let parentesco = this.catalogo.parentesco.find(elemento => elemento.id == this.dataShow.parents[0].economic[0].parentesco);
        let estado_civil = this.dataShow.parents[0].economic[0].estado_civil == 1 ? 'CASADO/A' : 'SOLTERO/A';
        this.showCatalogo = {
          'dependencia': dependencia.dependencia,
          'escolaridad': escolaridad.escolaridad,
          'parentesco': parentesco.parentesco,
          'estado_civil': estado_civil
        }
      }
    });
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

  getLocations(id: number, data: any) {
    this.getRequest(data);
    // this.crecheService.getLocations(id).subscribe({
    //   next: (response) => {
    //     this.locations = response;
    //   }
    // })
  }

  getCreches() {
    // this.crecheService.getCreches(this.selectLocation).subscribe({
    //   next: (response) => {
    //     this.creches = response;
    //   }
    // })
  }

  sendMessage() {
    if (this.newMessage == '' || this.motivoMessage == '') {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes de escribir un mensaje y seleccionar un motivo para poder enviar el correo.',
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }
    if (this.motivoMessage == 4 && this.lugarCorreccion == '') {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes de seleccionar un formulario para la corrección.',
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }


    const body = { 'message': this.newMessage, 'request_id': this.miFormulario.value.request_id, 'message_motive_id': this.motivoMessage, 'form_id': this.lugarCorreccion };
    this.allService.sendMessageToRequest(body).subscribe({
      next: (response) => {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
          this.newMessage = null;
          this.motivoMessage = null;
        } else {
          Swal.fire({
            position: 'center',
            icon: 'info',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
        }
      }, error: (err) => {
        console.log(err);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: err.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    });
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

  exportComite() {
    this.allService.exportComite(this.miFormularioExport.value).subscribe({
      next: (response) => {
        this.downLoadFile(response, "application/ms-excel", "Empleados.xlsx");
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
}
