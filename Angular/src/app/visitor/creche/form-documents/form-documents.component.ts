import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AllVisitorService } from '../../services/all-visitor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-documents',
  templateUrl: './form-documents.component.html',
  styleUrls: ['./form-documents.component.css']
})
export class FormDocumentsComponent {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInput2') fileInput2!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private allVisitorService: AllVisitorService) { }

  miFormulario: FormGroup = this.fb.group({
    // Agrega aquí los otros campos de tu formulario reactivo
    request_id: ['', Validators.required], // Ejemplo de campo requerido
    front_INE: [null, Validators.required], // Campo de archivo requerido
    behind_INE: [null, Validators.required],
    beneficiary_id: [null, Validators.required]
  });

  request_id: number;
  beneficiaries: any = [];
  undocumentedBeneficiaries: any = [];
  beneficiariesComplet: any = [];
  onlySee: boolean = false;
  

  selectedFileName: string | null = null;
  selectedFilePreview: string | null = null;
  selectedFileName2: string | null = null;
  selectedFilePreview2: string | null = null;

  ngOnInit(): void {
    this.initTable();
  };

  private initTable() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.request_id = params['id'];
      this.miFormulario.patchValue({ request_id: params['id'] });
      if (id) {
        this.allVisitorService.showParentsVisitor(id).subscribe({
          next: (response) => {
            console.log(response);
            this.undocumentedBeneficiaries = response.undocumentedBeneficiary;
            this.beneficiariesComplet = response.beneficiariesComplet;
          }
        });
      };
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

  handleFiles(files: FileList): void {
    if (files.length > 0) {
      const selectedFile = files[0];
    }
  }

  onDragOver2(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop2(event: DragEvent): void {
    event.preventDefault();
    const files = (event.dataTransfer?.files || []) as FileList;
    this.onFileSelected2({ target: { files } });
  }

  onFileSelected2(event: any): void {
    const files = event.target.files || event.dataTransfer.files;

    if (files.length > 0) {
      const file = files[0];

      this.miFormulario.patchValue({ behind_INE: file });

      this.selectedFileName2 = file.name;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.selectedFilePreview2 = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.selectedFilePreview2 = null;
      }
    }
  }

  handleFiles2(files: FileList): void {
    if (files.length > 0) {
      const selectedFile = files[0];
    }
  }

  onSubmit(): void {
    this.miFormulario.patchValue({ beneficiary_id: this.undocumentedBeneficiaries[0]?.id });
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAsTouched();
    }
    const formData = new FormData();
    formData.append('request_id', this.miFormulario.get('request_id').value);
    formData.append('beneficiary_id', this.miFormulario.get('beneficiary_id').value);
    formData.append('front_ine', this.miFormulario.get('front_INE').value);
    formData.append('behind_ine', this.miFormulario.get('behind_INE').value);

    // console.log(formData.getAll('front_ine'))
    
    this.allVisitorService.uploadFileWithFormData(formData).subscribe({
      next: (response) => {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
          this.miFormulario.reset();
          this.initTable();
          this.fileInput.nativeElement.value = '';
          this.fileInput2.nativeElement.value = '';
          this.selectedFileName = null;
          this.selectedFileName2 = null;
          this.selectedFilePreview = null;
          this.selectedFilePreview2 = null;
        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
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
          title: err,
          showConfirmButton: false,
          timer: 2000
        })
      }
    });
    
  }
}