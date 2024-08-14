import { HttpClient } from '@angular/common/http';
import { Component, ElementRef } from '@angular/core';
import { AllService } from '../../services/all.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-catalog',
  templateUrl: './user-catalog.component.html',
  styleUrls: ['./user-catalog.component.css']
})
export class UserCatalogComponent {
  data: any = [];
  roles: any = [];
  headers = ['No.', 'Nombre', 'Correo', 'Rol', 'Acciones'];

  constructor(private http: HttpClient, private allService: AllService, private fb: FormBuilder, private elementRef: ElementRef) {
  }

  miFormulario: FormGroup = this.fb.group({
    id: ['', [Validators.nullValidator]],
    name: ['', [Validators.required]],
    role_id: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    change_password: [0, [Validators.nullValidator]]
  });

  ngOnInit(): void {
    this.initTable();
  }

  private initTable() {
    this.allService.getUsers().subscribe({
      next: (response) => {
        this.data = response;
      }
    });
    this.allService.getDataUser().subscribe({
      next: (response) => {
        this.roles = response;
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
    let message = accion == 1 ? '¿Está seguro que desea registrar ' + this.miFormulario.value.name + ' como nuevo usuario?' : '¿Está seguro que desea actualizar este usuario?';
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
          this.allService.createUser(this.miFormulario.value).subscribe(response => {
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
          this.allService.updateUser(this.miFormulario.value).subscribe(response => {
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
    let message = accion == 1 ? '¿Está seguro de que desea deshabilitar este usuario?' : '¿Está seguro de que desea reactivar este usuario?';
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
          this.allService.deleteUser(this.miFormulario.value.id).subscribe(response => {
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
          this.allService.restoreUser(this.miFormulario.value.id).subscribe(response => {
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
      name: data.name,
      role_id: data.role_id,
      email: data.email
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