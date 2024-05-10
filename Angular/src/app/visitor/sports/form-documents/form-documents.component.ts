import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { DocumentsService } from '../../services/documents.service';

@Component({
  selector: 'app-form-documents',
  templateUrl: './form-documents.component.html',
  styleUrls: ['./form-documents.component.css']
})
export class FormDocumentsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  request_id: number;
  urlPrincipal: string;
  selectedFileName: string | null = null;
  selectedFilePreview: string | null = null;
  documents: any[] = []; // Inicializamos documents como un arreglo vacío
  primerDocumentoDisponibleIndex: number = 0;
  total_documents: number = 0;
  activeDocument: any;
  indexMayor: number = 0;
  baseUrl = environment.dowload;

  constructor(private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute,private documentService: DocumentsService
  ) { }

  miFormulario: FormGroup = this.fb.group({
    // Agrega aquí los otros campos de tu formulario reactivo
    request_id: ['', Validators.required], // Ejemplo de campo requerido
    file: [null, Validators.required], // Campo de archivo requerido
    type_file: [null, Validators.required],
    name_file: [null, Validators.required],
    type_person_id: [null, Validators.nullValidator]
  });

  ngOnInit(): void {
    this.obtenerURLPrincipal();
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
      if (this.request_id) {
        this.showDocuments(this.request_id);
      }
    });
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

  obtenerURLPrincipal() {
    const urlCompleta = this.router.url;
    const segmentos = urlCompleta.split('/');
    this.urlPrincipal = '/' + segmentos[1];
  }

  showDocuments(id: any): void {
    this.miFormulario.patchValue({
      request_id: id
    });
    this.documentService.getDocuments(id).subscribe({
      next: (response) => {
        this.documents = response.documents;
        this.total_documents = response.total_documents;
        // Encontrar el índice del primer documento con documents_request de longitud 0
        this.primerDocumentoDisponibleIndex = this.documents.findIndex(item => item.documents_request.length === 0);

        if (this.primerDocumentoDisponibleIndex < 0 || this.primerDocumentoDisponibleIndex >= this.documents.length) {
          this.primerDocumentoDisponibleIndex = this.documents.length - 1;
        }
        this.mostrar(this.documents[this.primerDocumentoDisponibleIndex], this.primerDocumentoDisponibleIndex);
      }
    });
  }

  mostrar(data: any, index) {
    this.indexMayor = index > this.indexMayor ? index : this.indexMayor;
    this.activeDocument = data;
    this.miFormulario.patchValue({
      'file': data.documents_request ?? '',
      'type_file': data.id,
      'name_file': data.name
    });
    this.primerDocumentoDisponibleIndex = index;
  }

  onSubmit() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }

    const formData = new FormData();
    formData.append('request_id', this.miFormulario.get('request_id').value);
    formData.append('file', this.miFormulario.get('file').value);
    formData.append('type_file', this.miFormulario.get('type_file').value);
    formData.append('name_file', this.miFormulario.get('name_file').value);
    this.documentService.storeDocument(formData).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.ngOnInit();
          if (response.total_documents == this.documents.length) {
            this.handleSuccessResponse(response);
          } else {
            this.fileInput = null;
            this.selectedFileName = null;
            this.selectedFilePreview = null;
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: response.message,
              showConfirmButton: false,
              timer: 2000
            });
          }
        } else {
          this.handleErrorResponse(response);
        }
      }, error: (err) => {
        Swal.fire("Error", "error")
      }
    });
  }

  handleSuccessResponse(response: any): void {
    this.fileInput = null;
    this.selectedFileName = null;
    this.selectedFilePreview = null;
    const message = 'Documentos guardados correctamente ¿desea continuar con el reglamento y aviso de privacidad?';
    const swalOptions: any = {
      title: message,
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `No`,
    };
    Swal.fire(swalOptions).then((result) => {
      if (result.isConfirmed) {
        this.ngOnInit();
        this.router.navigateByUrl(this.urlPrincipal + '/beca-deportiva/' + this.miFormulario.value.request_id + '/reglamento');
      } else {
        this.ngOnInit();
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
}