import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-important-archievement',
  templateUrl: './important-archievement.component.html',
  styleUrls: ['./important-archievement.component.css']
})
export class ImportantArchievementComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('myModalButton') myModalButton: ElementRef;
  selectedFileName: string | null = null;
  selectedFilePreview: string | null = null;
  urlPrincipal: string;
  baseUrl = environment.dowload;
  request_id: number;
  documents: any[] = [];

  expandedItemIndex: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private documentService: DocumentsService, private elementRef: ElementRef) {
  }

  miFormulario: FormGroup = this.fb.group({
    file: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(150)]]
  });

  ngOnInit(): void {
    this.obtenerURLPrincipal();
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
    });
    this.showImportantArchivements();
  }

  showImportantArchivements(): void {
    this.documentService.getImportantArchivement().subscribe({
      next: (response) => {
        if (response.length > 0) {
          this.documents = response;
        } else {
          this.documents = [];
          this.myModalButton.nativeElement.click();
        }
      }
    });
  }

  obtenerURLPrincipal() {
    const urlCompleta = this.router.url;
    const segmentos = urlCompleta.split('/');
    this.urlPrincipal = '/' + segmentos[1];
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    const files = (event.dataTransfer?.files || []) as FileList;
    this.onFileSelected({ target: { files } });
  }

  onFileSelected(event: any): void {
    const files = event.target.files || event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];

      this.miFormulario.patchValue({ file: file });

      this.selectedFileName = file.name;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFilePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.selectedFilePreview = null;
      }
    }
  }

  onSubmit() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }

    const formData = new FormData();
    formData.append('file', this.miFormulario.get('file').value);
    formData.append('description', this.miFormulario.get('description').value);

    this.documentService.storeImportantArchivement(formData).subscribe({
      next: (response) => {
        if (response.code == 200) {
          if (this.documents.length > 0) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 2000
            });
            this.miFormulario.patchValue({ file: null, description: '' });
            this.clearFileInput();
            this.showImportantArchivements();
          } else {
            Swal.fire({
              position: 'center',
              icon: 'question',
              title: 'Se ha actualizado tu perfil, para continuar con tu solicitud, dar clic de nuevo en el botón Iniciar Solicitud.',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonText: 'Continuar',
              cancelButtonText: `No`
            }).then((result) => {
              if (result.isConfirmed) {
                this.router.navigateByUrl(this.urlPrincipal + '/dashboard');
              } else if (result.isDenied) {
                this.miFormulario.patchValue({ file: null, description: '' });
                this.clearFileInput();
                this.ngOnInit();
                return;
              }
            })
          }
        } else {
          this.handleErrorResponse(response);
        }
      }, error: (err) => {
        Swal.fire("Error", "error")
      }
    });
  }


  handleErrorResponse(response: any): void {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: response.message,
      showConfirmButton: true
    });
    this.myModalButton.nativeElement.click();
  }

  delete(id) {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea eliminar la información de este logro?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.deleteImportantArchivement(id).subscribe({
          next: (response) => {
            if (response.code == 200) {
              this.cerrarModal();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
              });
              this.showImportantArchivements();
            } else {
              Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
              });
            }
          }
        });
      } else {
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

  clearFileInput(): void {
    this.fileInput.nativeElement.value = null;
    this.selectedFileName = null;
    this.selectedFilePreview = null;
  }

  cerrarModal() {
    const botonCancel: any = this.elementRef.nativeElement.querySelector('#cancel');
    botonCancel.click();
  }

}
