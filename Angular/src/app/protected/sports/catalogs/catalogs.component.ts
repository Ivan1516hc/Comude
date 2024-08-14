import { Component } from '@angular/core';
import { UserCatalogComponent } from '../user-catalog/user-catalog.component';
import { DisciplineCatalogComponent } from '../discipline-catalog/discipline-catalog.component';
import { JustificationTypeCatalogComponent } from '../justification-type-catalog/justification-type-catalog.component';
import { DocumentProcedureCatalogComponent } from '../document-procedure-catalog/document-procedure-catalog.component';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent {

  catalogs = [
    { title: 'Usuarios', component: UserCatalogComponent },
    { title: 'Disciplinas', component: DisciplineCatalogComponent },
    { title: 'Justificaciones', component: JustificationTypeCatalogComponent },
    { title: 'Documentos', component: DocumentProcedureCatalogComponent }
  ];

  selectedComponent: any = UserCatalogComponent;

  selectCatalog(component: any) {
    this.selectedComponent = component;
  }
}
