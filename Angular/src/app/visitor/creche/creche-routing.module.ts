import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormChildComponent } from './form-child/form-child.component';
import { FormParentsComponent } from './form-parents/form-parents.component';
import { FormHousingComponent } from './form-housing/form-housing.component';
import { FormReferencesComponent } from './form-references/form-references.component';
import { FormDocumentsComponent } from './form-documents/form-documents.component';

const routes: Routes = [{
  path: '',
  children:[
    {path: 'solicitud/:id/beneficiario', component:FormChildComponent},
    {path: 'beneficiario/:beneficiary/:id', component:FormChildComponent},
    {path: 'solicitud/:id/padres', component:FormParentsComponent},
    {path: 'solicitud/:id/vivienda', component:FormHousingComponent},
    {path: 'solicitud/:id/referencia', component:FormReferencesComponent},
    {path: 'solicitud/:id/documentos', component:FormDocumentsComponent},
    {path: 'padres/:padre/:id', component:FormParentsComponent},
    //------------------------------------------------------------------------------------------------------
    {path: '**', redirectTo: 'home'},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrecheRoutingModule { }
