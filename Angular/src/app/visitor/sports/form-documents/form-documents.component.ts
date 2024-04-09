import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-documents',
  templateUrl: './form-documents.component.html',
  styleUrls: ['./form-documents.component.css']
})
export class FormDocumentsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  request_id: number;
  urlPrincipal: string;
  catalog: any;
  selectedFileName: string | null = null;
  selectedFilePreview: string | null = null;
  isImagen: boolean = true;

  constructor(private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute
  ) {

  }

  miFormulario: FormGroup = this.fb.group({
    // Agrega aquí los otros campos de tu formulario reactivo
    request_id: ['', Validators.required], // Ejemplo de campo requerido
    front_INE: [null, Validators.required], // Campo de archivo requerido
    behind_INE: [null, Validators.required],
    beneficiary_id: [null, Validators.required]
  });


  ngOnInit(): void {
    this.obtenerURLPrincipal();
    this.route.params.subscribe(params => {
      this.request_id = params['id'];
      if (this.request_id) {
        this.showConpetition(this.request_id);
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

      this.miFormulario.patchValue({ front_INE: file });

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



  showConpetition(id: any): void {

  }



  mostrarImagen() {
    this.isImagen = true;
  }

  mostrarDocumento() {
    this.isImagen = false;
  }

  onSubmit() {

  }
}
