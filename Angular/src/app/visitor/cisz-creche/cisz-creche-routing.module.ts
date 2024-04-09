import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormChildComponent } from '../creche/form-child/form-child.component';
import { FormParentComponent } from './form-parent/form-parent.component';
import { FormReferencesComponent } from '../creche/form-references/form-references.component';
import { FormDocumentsComponent } from './form-documents/form-documents.component';

const routes: Routes = [{
  path: '',
  children:[
    {path: 'solicitud/:id/beneficiario', component:FormChildComponent},
    {path: 'beneficiario/:beneficiary/:id', component:FormChildComponent},
    {path: 'solicitud/:id/padres', component:FormParentComponent},
    {path: 'solicitud/:id/referencia', component:FormReferencesComponent},
    {path: 'solicitud/:id/documentos', component:FormDocumentsComponent},
    //------------------------------------------------------------------------------------------------------
    {path: '**', redirectTo: 'home'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CiszCrecheRoutingModule { }
