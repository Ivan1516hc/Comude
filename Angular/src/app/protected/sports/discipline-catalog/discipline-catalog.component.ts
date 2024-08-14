import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AllService } from '../../services/all.service';

@Component({
  selector: 'app-discipline-catalog',
  templateUrl: './discipline-catalog.component.html',
  styleUrls: ['./discipline-catalog.component.css']
})
export class DisciplineCatalogComponent {
  data: any = [];
  headers = ['No.', 'Nombre', 'Acciones'];

  constructor(private http: HttpClient, private allService: AllService, private fb: FormBuilder, private elementRef: ElementRef) {
  }

  miFormulario: FormGroup = this.fb.group({
    id: ['', [Validators.nullValidator]],
    name: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.initTable();
  }

  private initTable() {
    this.allService.getDiscipline().subscribe({
      next: (response) => {
        this.data = response;
      }
    });
  }

  cerrarModal() {
    const botonCancel: any = this.elementRef.nativeElement.querySelector('#cancel');
    botonCancel.click();
  }

  submit(accion) {
    if (this.miFormulario.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes de llenar el formulario corectamente.',
        showConfirmButton: true
      })
      return;
    }
    let message = accion == 1 ? '¿Está seguro que desea registrar ' + this.miFormulario.value.name + ' como nueva disciplina?' : '¿Está seguro que desea actualizar esta desciplina?';
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: message,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        if (accion == 1) {
          this.allService.createDiscipline(this.miFormulario.value).subscribe(response => {
            if (response.code == 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
              })
            } else {
              Swal.fire("Error", "error")
            }
          })
        } else if (accion == 2) {
          this.allService.updateDiscipline(this.miFormulario.value).subscribe(response => {
            if (response.code == 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
              })
            } else {
              Swal.fire("Error", "error")
            }
          })
        }
        this.cerrarModal();
        this.initTable();
      } else if (result.isDenied) {
        return;
      }
    })
  }

  delete(accion: number, id: number) {
    this.miFormulario.patchValue({ id: id });
    let message = accion == 1 ? '¿Está seguro de que desea deshabilitar esta disciplina?' : '¿Está seguro de que desea reactivar esta disciplina?';
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: message,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        if (accion == 1) {
          this.allService.deleteDisciplines(this.miFormulario.value.id).subscribe(response => {
            if (response.code == 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
              })
              this.initTable()
            } else {
              Swal.fire("Error", "error")
            }
          })
        } else if (accion == 2) {
          this.allService.restoreDisciplines(this.miFormulario.value.id).subscribe(response => {
            if (response.code == 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
              })
              this.initTable()
            } else {
              Swal.fire("Error", "error")
            }
          })
        }

      } else if (result.isDenied) {
        return;
      }
    })
  }

  getItem(data: any) {
    if (data == null) {
      this.miFormulario.reset();
      return;
    }
    this.miFormulario.patchValue({
      id: data.id,
      name: data.name
    });
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
}