import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-form-importan-archievement',
  templateUrl: './form-importan-archievement.component.html',
  styleUrls: ['./form-importan-archievement.component.css']
})
export class FormImportanArchievementComponent {


  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFileName: string | null = null;
  selectedFilePreview: string | null = null;
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

      // this.miFormulario.patchValue({ front_INE: file });

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
}
