import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-form-justification',
  templateUrl: './form-justification.component.html',
  styleUrls: ['../../../visitor/shared/important-archievement/important-archievement.component.css']
})
export class FormJustificationComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFileName: string | null = null;
  selectedFilePreview: string | null = null;
  urlPrincipal: string;
  baseUrl = environment.dowload;
  request_id: number;
  documents: any[] = [];
  justificationType: any[] = [];
  request: any;

  expandedItemIndex: number | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder,
    private documentService: DocumentsService) {
  }

  miFormulario: FormGroup = this.fb.group({
    request_id: ['', [Validators.required]],
    file: ['', [Validators.required]],
    justification_type_id: ['', [Validators.required]],
    description: ['', [Validators.required, Validators.maxLength(150)]]
  });

  ngOnInit(): void {
    this.obtenerURLPrincipal();
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
    });
    this.miFormulario.patchValue({
      'request_id': this.request_id
    })

    this.showJustification(this.request_id);
  }

  showJustification(id): void {
    this.documentService.getJustification(id).subscribe({
      next: (response) => {
        if (response.data.length > 0) {
          this.documents = response.data;
        } else {
          this.documents = [];
        }
        this.justificationType = response.catalogs
        this.request = response.request;
      }
    })
  }

  getIconClass(fileName: string): boolean {
    const extension = fileName.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
      return true;
    } else {
      return false;
    }
  }

  sendJustification() {
    Swal.fire({
      position: 'center',
      icon: 'question',
      title: '¿Está seguro de que desea enviar las evidencias? (ya no podra agregar más)',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: `No`
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentService.finishJustification(this.request_id).subscribe({
          next: (response) => {
            if (response.code == 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: true
              });
              this.ngOnInit();
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
        })
      } else {
        return;
      }
    })
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
    formData.append('request_id', this.miFormulario.get('request_id').value);
    formData.append('justification_type_id', this.miFormulario.get('justification_type_id').value);
    formData.append('description', this.miFormulario.get('description').value);

    this.documentService.storeJustification(formData).subscribe({
      next: (response) => {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          });
          this.ngOnInit();
          this.clearFileInput();
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
      showConfirmButton: false,
      timer: 2000
    });
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
        this.documentService.deleteJustification(id).subscribe({
          next: (response) => {
            if (response.code == 200) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.message,
                showConfirmButton: false,
                timer: 2000
              });
              this.ngOnInit();
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

}
