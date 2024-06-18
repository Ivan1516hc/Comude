"use strict";(self.webpackChunkTramites=self.webpackChunkTramites||[]).push([[761],{2514:(x,w,a)=>{a.d(w,{e:()=>t});var r=a(9862),b=a(6306),m=a(553),T=a(4946);let t=(()=>{var e;class A{constructor(o){this.http=o,this.baseUrl=m.N.baseUrl}setSelections(o,n,d,g){this.procedure=o,this.job_position=n,this.dependence_id=d,this.employee_number=g}clearProcedure(){this.procedure=null}clearCenter(){this.center=null}clearRoom(){this.room=null}clearJob_position(){this.job_position=null}clearDependence_id(){this.dependence_id=null}clearEmployee_number(){this.employee_number=null}getProcedure(){return this.procedure}getCenter(){return this.center}getRoom(){return this.room}getJob_position(){return this.job_position}getDependence_id(){return this.dependence_id}getEmployee_number(){return this.employee_number}changePassword(o){return this.http.patch(`${this.baseUrl}/request/aplicant/update/password`,o)}indexRequestVisitor(){return this.http.get(`${this.baseUrl}/visitor/request`)}showBeneficiaryVisitor(o){return this.http.get(`${this.baseUrl}/beneficiary/`+o)}showParentsVisitor(o){return this.http.get(`${this.baseUrl}/request/parents/document/`+o)}showParents(o){return this.http.get(`${this.baseUrl}/request/parents/`+o)}showHousingVisitor(o){return this.http.get(`${this.baseUrl}/request/housing/show/`+o)}showReferencesVisitor(o){return this.http.get(`${this.baseUrl}/request/references/show/`+o)}getBeneficiariesRequest(o){return this.http.get(`${this.baseUrl}/request/beneficiary/`+o)}getAddressRequest(o){return this.http.get(`${this.baseUrl}/request/address/`+o)}getDocumentsProcedure(o){return this.http.get(`${this.baseUrl}/request/beneficiary/`+o)}createHousingRequest(o){return this.http.post(`${this.baseUrl}/request/housing/create`,o)}createReferencesRequest(o){return this.http.post(`${this.baseUrl}/request/references/create`,o)}changeStatusRequest(o){return this.http.post(`${this.baseUrl}/request/update/status`,o)}showRequest(o){return this.http.get(`${this.baseUrl}/request/show/`+o)}uploadFileWithFormData(o){const n=new r.WM({"Content-Type":"multipart/form-data"});return this.http.post(`${this.baseUrl}/beneficiary/upload`,o,{headers:n}).pipe((0,b.K)(d=>{throw console.error("Error en la solicitud:",d),d}))}uploadFileWithFormDataCisz(o){const n=new r.WM({"Content-Type":"multipart/form-data"});return this.http.post(`${this.baseUrl}/beneficiary/upload/cisz`,o,{headers:n}).pipe((0,b.K)(d=>{throw console.error("Error en la solicitud:",d),d}))}storeRequest(o){return this.http.post(`${this.baseUrl}/request/create`,o)}getDataDiscipline(){return this.http.get(`${this.baseUrl}/catalog/discipline`)}getDataCompetition(){return this.http.get(`${this.baseUrl}/catalog/competition`)}getDataCountryStates(o){return this.http.get(`${this.baseUrl}/catalog/country-state/${o}`)}storeCompetition(o){return this.http.post(`${this.baseUrl}/request/competitions/store`,o)}getCompetition(o){return this.http.get(`${this.baseUrl}/request/competitions/show/${o}`)}storeBankAccount(o){const n=new r.WM({"Content-Type":"multipart/form-data"});return this.http.post(`${this.baseUrl}/request/bank-account/store`,o,{headers:n}).pipe((0,b.K)(d=>{throw console.error("Error en la solicitud:",d),d}))}storeImportantArchivement(o){const n=new r.WM({"Content-Type":"multipart/form-data"});return this.http.post(`${this.baseUrl}/request/important-archivement/store`,o,{headers:n}).pipe((0,b.K)(d=>{throw console.error("Error en la solicitud:",d),d}))}showJustificationType(){return this.http.get(`${this.baseUrl}/request/important-archivement/show`)}storeJustification(o){const n=new r.WM({"Content-Type":"multipart/form-data"});return this.http.post(`${this.baseUrl}/request/justification/store`,o,{headers:n}).pipe((0,b.K)(d=>{throw console.error("Error en la solicitud:",d),d}))}getImportantArchivement(){return this.http.get(`${this.baseUrl}/request/important-archivement/show`)}getJustification(o){return this.http.get(`${this.baseUrl}/request/justification/show/${o}`)}deleteImportantArchivement(o){return this.http.delete(`${this.baseUrl}/request/important-archivement/delete/${o}`)}deleteJustification(o){return this.http.delete(`${this.baseUrl}/request/justification/delete/${o}`)}finishJustification(o){return this.http.get(`${this.baseUrl}/request/justification/finish/${o}`)}getBankAccount(o){return this.http.get(`${this.baseUrl}/request/bank-account/show/${o}`)}storeDocument(o){const n=new r.WM({"Content-Type":"multipart/form-data"});return this.http.post(`${this.baseUrl}/request/documents/store`,o,{headers:n}).pipe((0,b.K)(d=>{throw console.error("Error en la solicitud:",d),d}))}getDocuments(o){return this.http.get(`${this.baseUrl}/request/documents/show/${o}`)}getInfo(){return this.http.get(`${this.baseUrl}/request/aplicant/show`)}updateInfo(o){return this.http.put(`${this.baseUrl}/request/aplicant/update`,o)}}return(e=A).\u0275fac=function(o){return new(o||e)(T.LFG(r.eN))},e.\u0275prov=T.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),A})()},7868:(x,w,a)=>{a.d(w,{b:()=>P});var r=a(95),b=a(3519),m=a.n(b),T=a(553),t=a(4946),e=a(3518),A=a(2514),Z=a(6814);const o=["fileInput"];function n(p,C){if(1&p&&(t.TgZ(0,"button",29),t._uU(1,"Continuar sin registrar logros"),t.qZA()),2&p){const h=t.oxw();t.Q6J("routerLink","/solicitante/beca-deportiva/"+h.request_id+"/documentacion")}}function d(p,C){if(1&p&&(t.TgZ(0,"p"),t._uU(1),t.qZA()),2&p){const h=t.oxw().$implicit;t.xp6(1),t.Oqu(h.description)}}function g(p,C){if(1&p&&(t.TgZ(0,"p"),t._uU(1),t.ALo(2,"slice"),t.qZA()),2&p){const h=t.oxw().$implicit;t.xp6(1),t.Oqu(t.Dn7(2,1,h.description,0,50))}}function _(p,C){if(1&p){const h=t.EpF();t.TgZ(0,"a",38),t.NdJ("click",function(){t.CHM(h);const i=t.oxw().$implicit,u=t.oxw();return t.KtG(u.toggleText(i))}),t._uU(1),t.qZA()}if(2&p){const h=t.oxw().$implicit;t.xp6(1),t.hij(" ",h.mostrarTextoCompleto?"Ver menos":"Leer m\xe1s"," ")}}function U(p,C){if(1&p){const h=t.EpF();t.TgZ(0,"div",30)(1,"article",31),t._UZ(2,"img",32),t.TgZ(3,"div",33)(4,"p")(5,"strong"),t._uU(6,"Descripci\xf3n:"),t.qZA()(),t.YNc(7,d,2,1,"p",34),t.YNc(8,g,3,5,"p",34),t.TgZ(9,"div",35),t.YNc(10,_,2,1,"a",36),t.TgZ(11,"button",37),t.NdJ("click",function(){const u=t.CHM(h).$implicit,v=t.oxw();return t.KtG(v.delete(null==u?null:u.id))}),t._uU(12,"Eliminar"),t.qZA()()()()()}if(2&p){const h=C.$implicit,l=t.oxw();t.xp6(2),t.Q6J("src",l.baseUrl+"sports/"+h.file_name,t.LSH),t.xp6(5),t.Q6J("ngIf",h.mostrarTextoCompleto),t.xp6(1),t.Q6J("ngIf",!h.mostrarTextoCompleto),t.xp6(2),t.Q6J("ngIf",l.isLongText(h.description))}}function F(p,C){if(1&p&&(t.TgZ(0,"div",39),t._UZ(1,"img",40),t.TgZ(2,"p")(3,"span"),t._uU(4),t.qZA()()()),2&p){const h=t.oxw();t.xp6(1),t.Q6J("src",h.selectedFilePreview,t.LSH),t.xp6(3),t.Oqu(h.selectedFileName)}}function q(p,C){1&p&&(t.TgZ(0,"div",41)(1,"span"),t._uU(2,"Arrastra o selecciona un archivo"),t.qZA()())}let P=(()=>{var p;class C{constructor(l,i,u,v){this.route=l,this.router=i,this.fb=u,this.allService=v,this.selectedFileName=null,this.selectedFilePreview=null,this.baseUrl=T.N.dowload,this.documents=[],this.expandedItemIndex=null,this.miFormulario=this.fb.group({file:["",[r.kI.required]],description:["",[r.kI.required,r.kI.maxLength(150)]]}),this.limiteCaracteres=50}ngOnInit(){this.obtenerURLPrincipal(),this.route.params.subscribe(l=>{this.request_id=l.id}),this.showImportantArchivements()}showImportantArchivements(){this.allService.getImportantArchivement().subscribe({next:l=>{this.documents=l.length>0?l:[]}})}obtenerURLPrincipal(){const i=this.router.url.split("/");this.urlPrincipal="/"+i[1]}onDragOver(l){l.preventDefault()}onDrop(l){l.preventDefault(),this.onFileSelected({target:{files:l.dataTransfer?.files||[]}})}onFileSelected(l){const i=l.target.files||l.dataTransfer.files;if(i.length>0){const u=i[0];if(this.miFormulario.patchValue({file:u}),this.selectedFileName=u.name,u.type.startsWith("image/")){const v=new FileReader;v.onload=s=>{this.selectedFilePreview=s.target.result},v.readAsDataURL(u)}else this.selectedFilePreview=null}}onSubmit(){if(this.miFormulario.invalid)return this.miFormulario.markAllAsTouched();const l=new FormData;l.append("file",this.miFormulario.get("file").value),l.append("description",this.miFormulario.get("description").value),this.allService.storeImportantArchivement(l).subscribe({next:i=>{200==i.code?(m().fire({position:"center",icon:"success",title:i.message,showConfirmButton:!1,timer:2e3}),this.miFormulario.patchValue({file:null}),this.selectedFileName=null,this.selectedFilePreview=null,this.showImportantArchivements()):this.handleErrorResponse(i)},error:i=>{m().fire("Error","error")}})}handleErrorResponse(l){m().fire({position:"center",icon:"error",title:l.message,showConfirmButton:!1,timer:2e3})}delete(l){m().fire({position:"center",icon:"question",title:"\xbfEst\xe1 seguro de que desea eliminar la informaci\xf3n de este logro?",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"No"}).then(i=>{i.isConfirmed&&this.allService.deleteImportantArchivement(l).subscribe({next:u=>{200==u.code?(m().fire({position:"center",icon:"success",title:u.message,showConfirmButton:!1,timer:2e3}),this.showImportantArchivements()):m().fire({position:"center",icon:"error",title:u.message,showConfirmButton:!1,timer:2e3})}})})}isLongText(l){return l.length>this.limiteCaracteres}toggleText(l){l.mostrarTextoCompleto=!l.mostrarTextoCompleto}}return(p=C).\u0275fac=function(l){return new(l||p)(t.Y36(e.gz),t.Y36(e.F0),t.Y36(r.qu),t.Y36(A.e))},p.\u0275cmp=t.Xpm({type:p,selectors:[["app-important-archievement"]],viewQuery:function(l,i){if(1&l&&t.Gf(o,5),2&l){let u;t.iGM(u=t.CRH())&&(i.fileInput=u.first)}},decls:44,vars:5,consts:[[1,"card-body"],[1,"d-sm-flex","justify-content-between","align-items-center"],[1,"card-title","mb-2","mb-sm-0"],["class","btn btn-warning",3,"routerLink",4,"ngIf"],[1,"row"],[1,"col-12","col-md-6","col-lg-4","mt-2"],[1,"card","card-start"],["data-bs-toggle","modal","data-bs-target","#exampleModal","data-bs-whatever","@getbootstrap",1,"drop-zone"],["class","col-12 col-md-6 col-lg-4 ",4,"ngFor","ngForOf"],["id","exampleModal","tabindex","-1","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body","py-0","text-justify-custom"],[1,"row","g-3","mt-2",3,"formGroup","ngSubmit"],["for","fileInput",1,"form-label"],[1,"drop-zone-new",3,"dragover","drop","click"],["type","file","accept",".pdf, .jpg, .jpeg, .png",1,"visually-hidden",3,"change","drop"],["fileInput",""],["class","preview-container",4,"ngIf"],["class","file-input-placeholder",4,"ngIf"],[1,"form-text","text-muted"],["for","description",1,"col-form-label"],["name","description","type","text","id","description","formControlName","description","maxlength","150",1,"form-control"],[1,"modal-footer","flex-column","border-top-0"],["type","submit","data-bs-dismiss","modal",1,"btn","btn-lg","btn-primary","w-100","mx-0","mb-2"],["type","button","data-bs-dismiss","modal",1,"btn","btn-lg","btn-light","w-100","mx-0"],[1,"btn","btn-warning",3,"routerLink"],[1,"col-12","col-md-6","col-lg-4"],[1,"card"],["alt","Imagen",1,"card-img-top","m-1",2,"align-self","center",3,"src"],[1,"container"],[4,"ngIf"],[1,"d-grid","gap-1"],["href","javascript:void(0);",3,"click",4,"ngIf"],["type","button",1,"btn-lg","btn","btn-warning","mt-2",3,"click"],["href","javascript:void(0);",3,"click"],[1,"preview-container"],["alt","Archivo seleccionado",1,"preview-image",3,"src"],[1,"file-input-placeholder"]],template:function(l,i){if(1&l){const u=t.EpF();t.TgZ(0,"div",0)(1,"div",1)(2,"h5",2),t._uU(3,"Logros importantes"),t.qZA(),t.YNc(4,n,2,1,"button",3),t.qZA(),t.TgZ(5,"div",4)(6,"div",5)(7,"div",6)(8,"article",7)(9,"span"),t._uU(10,"Registrar logro"),t.qZA()()()(),t.YNc(11,U,13,4,"div",8),t.qZA(),t.TgZ(12,"div",9)(13,"div",10)(14,"div",11)(15,"div",12)(16,"h5",13),t._uU(17,"Registrar logro"),t.qZA(),t._UZ(18,"button",14),t.qZA(),t.TgZ(19,"div",15)(20,"form",16),t.NdJ("ngSubmit",function(){return i.onSubmit()}),t.TgZ(21,"div")(22,"label",17),t._uU(23,"Subir evidencia:"),t.qZA(),t.TgZ(24,"div",18),t.NdJ("dragover",function(s){return i.onDragOver(s)})("drop",function(s){return i.onDrop(s)})("click",function(){t.CHM(u);const s=t.MAs(26);return t.KtG(s.click())}),t.TgZ(25,"input",19,20),t.NdJ("change",function(s){return i.onFileSelected(s)})("drop",function(s){return i.onFileSelected(s)}),t.qZA(),t.YNc(27,F,5,2,"div",21),t.YNc(28,q,3,0,"div",22),t.qZA(),t.TgZ(29,"small",23),t._uU(30,"Formatos permitidos: pdf, jpg, jpeg, png"),t.qZA(),t._UZ(31,"br"),t.TgZ(32,"small",23),t._uU(33,"Tama\xf1o maximo aceptado: 1 MB o 1024 KB."),t.qZA()(),t.TgZ(34,"div")(35,"label",24),t._uU(36,"Descripci\xf3n breve:"),t.qZA(),t.TgZ(37,"textarea",25),t._uU(38," "),t.qZA()(),t.TgZ(39,"div",26)(40,"button",27),t._uU(41,"Guardar logro"),t.qZA(),t.TgZ(42,"button",28),t._uU(43,"Cerrar"),t.qZA()()()()()()()()}2&l&&(t.xp6(4),t.Q6J("ngIf",i.request_id),t.xp6(7),t.Q6J("ngForOf",i.documents),t.xp6(9),t.Q6J("formGroup",i.miFormulario),t.xp6(7),t.Q6J("ngIf",i.selectedFileName),t.xp6(1),t.Q6J("ngIf",!i.selectedFileName))},dependencies:[Z.sg,Z.O5,e.rH,r._Y,r.Fj,r.JJ,r.JL,r.nD,r.sg,r.u,Z.OU],styles:['.card-img-top[_ngcontent-%COMP%]{object-fit:contain;width:100%;height:220px}.card[_ngcontent-%COMP%]{max-width:100%;height:100%}.card[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:30px;margin-bottom:.05em}.card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{font-size:20px;color:#545454}.text-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:.1em}.drop-zone[_ngcontent-%COMP%]{border:3px dashed #00b4e5;width:100%;height:100%;text-align:center;cursor:pointer;position:relative;overflow:hidden;background:url(sports.abd5fb01768f77df.jpg) center/cover;transition:transform .5s ease;display:flex;justify-content:center;align-items:center}.drop-zone[_ngcontent-%COMP%]:after{content:"";background:linear-gradient(rgba(255,255,255,.8),rgba(255,255,255,.8));position:absolute;top:0;left:0;width:100%;height:100%;z-index:1}.drop-zone[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{position:relative;z-index:2;color:#00b4e5;font-size:28px;font-weight:700}.drop-zone[_ngcontent-%COMP%]:hover{transform:scale(1.05)}.drop-zone[_ngcontent-%COMP%]:active{transform:scale(.95)}@media (max-width: 767px){.card-start[_ngcontent-%COMP%]{max-width:100%;height:150px!important;margin-bottom:5px!important}.drop-zone[_ngcontent-%COMP%]{height:150px!important}}.preview-container[_ngcontent-%COMP%]{margin-top:10px}.preview-image[_ngcontent-%COMP%]{max-width:100%;max-height:200px;margin-bottom:5px}.file-input-placeholder[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .file-input-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.file-input-container[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:100%;max-height:80px;margin-bottom:10px}.nav-link.btn[_ngcontent-%COMP%]:hover{background-color:#f0f0f0}.division-line[_ngcontent-%COMP%]{border-right:1px solid #ccc;height:100%;margin-top:auto;margin-bottom:auto}.required[_ngcontent-%COMP%]:after{content:"*";color:red}.drop-zone-new[_ngcontent-%COMP%]{border:2px dashed #4154f1;padding:20px;text-align:center;cursor:pointer;position:relative}.text-card[_ngcontent-%COMP%]{overflow:hidden;white-space:pre-line;text-overflow:ellipsis}.text-card.expand[_ngcontent-%COMP%]{white-space:normal;overflow:visible;text-overflow:unset}']}),C})()},2050:(x,w,a)=>{a.d(w,{C:()=>Z});var r=a(4946),b=a(6814),m=a(3518),T=a(4567);let t=(()=>{var o;class n{constructor(g,_,U){this.router=g,this.document=_,this.authService=U}ngOnInit(){}sidebarToggle(){this.document.body.classList.toggle("toggle-sidebar")}logOut(){const g=localStorage.getItem("token");this.authService.logOut(g).subscribe({next:_=>{_.message&&this.router.navigateByUrl("/")},error:_=>{}})}}return(o=n).\u0275fac=function(g){return new(g||o)(r.Y36(m.F0),r.Y36(b.K0),r.Y36(T.e))},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-header"]],inputs:{urlLogo:"urlLogo"},decls:30,vars:2,consts:[["id","header",1,"header","fixed-top","d-flex","align-items-center"],[1,"logo-container","me-3"],[1,"logo-link",3,"routerLink"],["src","assets/img/logo_comude.png","alt","Logo","width","120px",1,"logo-img"],[1,"flex-grow-1"],[1,"mb-0","d-none","d-md-block"],[1,"text-end","me-5"],["routerLink","/solicitante/dashboard",1,"btn","btn-md","btn-secondary"],[1,"header-nav","ms-auto",2,"margin-left","auto"],[1,"d-flex","align-items-center","mb-0"],[1,"nav-item","dropdown"],["href","#","data-bs-toggle","dropdown",1,"nav-link","nav-profile","d-flex","align-items-center"],["src","assets/img/usuario-icono.jpg","alt","Profile",1,"rounded-circle",2,"width","40px","height","40px","object-fit","cover"],[1,"d-none","d-md-block","dropdown-toggle","ps-2"],[1,"dropdown-menu","dropdown-menu-end","dropdown-menu-arrow","profile"],["routerLink","/solicitante/perfil",1,"dropdown-item","d-flex","align-items-center"],[1,"bi","bi-person"],[1,"dropdown-item","d-flex","align-items-center",3,"click"],[1,"bi","bi-box-arrow-right"],[1,"logo-container","me-2","d-none","d-md-block"],["src","assets/img/escudo_casoespecial.png","alt","Logo","width","140px",1,"logo-img"]],template:function(g,_){1&g&&(r.TgZ(0,"header",0)(1,"div",1)(2,"a",2),r._UZ(3,"img",3),r.qZA()(),r.TgZ(4,"div",4)(5,"h3",5),r._uU(6,"Tr\xe1mites COMUDE Zapopan"),r.qZA()(),r.TgZ(7,"div",6)(8,"button",7),r._uU(9,"Mis solicitudes"),r.qZA()(),r.TgZ(10,"nav",8)(11,"ul",9)(12,"li",10)(13,"a",11),r._UZ(14,"img",12)(15,"span",13),r.qZA(),r.TgZ(16,"ul",14)(17,"li")(18,"a",15),r._UZ(19,"i",16),r.TgZ(20,"span"),r._uU(21,"Mi perfil"),r.qZA()()(),r.TgZ(22,"li")(23,"a",17),r.NdJ("click",function(){return _.logOut()}),r._UZ(24,"i",18),r.TgZ(25,"span"),r._uU(26,"Salir"),r.qZA()()()()()()(),r.TgZ(27,"div",19)(28,"a",2),r._UZ(29,"img",20),r.qZA()()()),2&g&&(r.xp6(2),r.Q6J("routerLink",_.urlLogo),r.xp6(26),r.Q6J("routerLink",_.urlLogo))},dependencies:[m.rH],styles:[".flex-container[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-height:100vh}app-footer[_ngcontent-%COMP%]{margin-top:auto}header[_ngcontent-%COMP%]{height:auto;padding:10px;background-color:#fff}.logo-container[_ngcontent-%COMP%]{margin-right:3rem}.text-end[_ngcontent-%COMP%]{margin-right:5rem}@media (max-width: 767px){.flex-container[_ngcontent-%COMP%]{align-items:center}header[_ngcontent-%COMP%]{text-align:center}.logo-container[_ngcontent-%COMP%], .text-end[_ngcontent-%COMP%]{margin-right:0}.logo-img[_ngcontent-%COMP%]{margin-bottom:1rem}}"]}),n})(),e=(()=>{var o;class n{constructor(){}ngOnInit(){}scrollTop(){window.scroll({top:0,left:0,behavior:"smooth"})}}return(o=n).\u0275fac=function(g){return new(g||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-footer"]],decls:9,vars:0,consts:[["id","footerVisitor",1,"footerVisitor"],[1,"copyright"],[1,"back-to-top","d-flex","align-items-center","justify-content-center",3,"click"],[1,"bi","bi-arrow-up-short"]],template:function(g,_){1&g&&(r.TgZ(0,"footer",0)(1,"div",1),r._uU(2," \xa9 Copyright "),r.TgZ(3,"strong")(4,"span"),r._uU(5,"COMUDE Zapopan"),r.qZA()(),r._uU(6,". Todos los derechos reservados."),r.qZA()(),r.TgZ(7,"a",2),r.NdJ("click",function(){return _.scrollTop()}),r._UZ(8,"i",3),r.qZA())}}),n})();const A=["*"];let Z=(()=>{var o;class n{constructor(){this.urlLogo="/dashboard"}}return(o=n).\u0275fac=function(g){return new(g||o)},o.\u0275cmp=r.Xpm({type:o,selectors:[["app-visitor"]],ngContentSelectors:A,decls:4,vars:0,consts:[[1,"flex-container"]],template:function(g,_){1&g&&(r.F$t(),r.TgZ(0,"div",0),r._UZ(1,"app-header"),r.Hsn(2),r._UZ(3,"app-footer"),r.qZA())},dependencies:[t,e],styles:[".flex-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh; \n\n}\n\napp-footer[_ngcontent-%COMP%] {\n  margin-top: auto; \n\n}"]}),n})()},2761:(x,w,a)=>{a.r(w),a.d(w,{VisitorModule:()=>l});var r=a(6814),b=a(3518),m=a(95),T=a(3519),t=a.n(T),e=a(4946),A=a(2514),Z=a(2050),o=a(7868);const n=["myButton"];function d(i,u){1&i&&(e.TgZ(0,"span",48),e._uU(1," Nombre requerido. "),e.qZA())}function g(i,u){1&i&&(e.TgZ(0,"span",48),e._uU(1," El RFC debe de tener 13 caracteres de longitud. "),e.qZA())}function _(i,u){1&i&&(e.TgZ(0,"span",48),e._uU(1," Fecha de nacimiento requerida. "),e.qZA())}function U(i,u){1&i&&(e.TgZ(0,"span",48),e._uU(1," N\xfamero de telefonico requerido con logitud de 10 n\xfameros. "),e.qZA())}function F(i,u){1&i&&(e.TgZ(0,"span",48),e._uU(1," La contrase\xf1a tiene minimo 6 digitos. "),e.qZA())}function q(i,u){1&i&&(e.TgZ(0,"span",48),e._uU(1," La nueva contrase\xf1a debe de tener minimo 6 digitos. "),e.qZA())}function P(i,u){1&i&&(e.TgZ(0,"span",48),e._uU(1," No coincide con la nueva contrase\xf1a. "),e.qZA())}const C=[{path:"guarderia",loadChildren:()=>a.e(195).then(a.bind(a,195)).then(i=>i.CrecheModule)},{path:"cisz-guarderia",loadChildren:()=>Promise.all([a.e(195),a.e(946)]).then(a.bind(a,1700)).then(i=>i.CiszCrecheModule)},{path:"beca-deportiva",loadChildren:()=>a.e(305).then(a.bind(a,1305)).then(i=>i.SportsModule)},{path:"dashboard",loadChildren:()=>a.e(814).then(a.bind(a,7814)).then(i=>i.DashboardModule)},{path:"perfil",component:(()=>{var i;class u{constructor(s,c){this.fb=s,this.allService=c,this.miFormulario=this.fb.group({name:["",[m.kI.required]],email:["",[m.kI.required]],phone_number:["",[m.kI.required,m.kI.pattern("^[0-9]+$"),m.kI.minLength(10),m.kI.maxLength(10)]],curp:[{value:"",disabled:!0},[m.kI.required]],rfc:["",[m.kI.minLength(13),m.kI.maxLength(13)]],birtdate:["",[m.kI.required]]}),this.miFormularioPassword=this.fb.group({password:["",[m.kI.required,m.kI.minLength(6)]],new_password:["",[m.kI.required,m.kI.minLength(6)]],new_password_repeat:["",[m.kI.required]]},{validators:this.passwordsMatchValidator})}passwordsMatchValidator(s){s.get("new_password").value!==s.get("new_password_repeat").value?s.get("new_password_repeat").setErrors({passwordsMismatch:!0}):s.get("new_password_repeat").setErrors(null)}subscribeToNumberFieldChanges(s){this.miFormulario.get(s).valueChanges.subscribe(c=>{if(!isNaN(parseFloat(c))&&isFinite(c))return;const f=c.replace(/\D/g,"");this.miFormulario.get(s).setValue(f,{emitEvent:!1})})}ngOnInit(){this.getDataUser(),["phone_number"].forEach(c=>{this.subscribeToNumberFieldChanges(c)})}getDataUser(){this.allService.getInfo().subscribe({next:s=>{this.populateForm(s)}})}populateForm(s){this.miFormulario.patchValue({name:s.name,email:s.email,password:s.password,phone_number:s.phone_number,curp:s.curp,rfc:s.rfc,birtdate:s.birtdate}),(!s.name||!s.phone_number||!s.rfc||!s.birtdate)&&this.myButton.nativeElement.click()}handleForm(s){}onSubmit(){if(this.miFormulario.invalid)return this.miFormulario.markAllAsTouched();const s=this.miFormulario.getRawValue();t().fire({position:"center",icon:"question",title:"\xbfEst\xe1 seguro de que desea actualizar su informaci\xf3n de perfil?",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"No"}).then(c=>{if(c.isConfirmed)this.allService.updateInfo(s).subscribe(f=>{200==f.code?(t().fire({position:"center",icon:"success",title:f.message,showConfirmButton:!1,timer:2e3}),this.getDataUser()):t().fire("Error","error")});else if(c.isDenied)return})}changePassword(){if(this.miFormularioPassword.invalid)return this.miFormularioPassword.markAllAsTouched();const s=this.miFormularioPassword.getRawValue();t().fire({position:"center",icon:"question",title:"\xbfEst\xe1 seguro de que desea actualizar su contrase\xf1a?",showConfirmButton:!0,showCancelButton:!0,confirmButtonText:"Si",cancelButtonText:"No"}).then(c=>{c.isConfirmed&&this.allService.changePassword(s).subscribe({next:f=>{200==f.code?(t().fire({position:"center",icon:"success",title:f.message,showConfirmButton:!1,timer:2e3}),this.getDataUser(),this.miFormularioPassword.reset()):t().fire({position:"center",icon:"error",title:f.message,showConfirmButton:!1,timer:2e3})},error:f=>{t().fire("Error","error")}})})}handleSuccessResponse(s){this.getDataUser()}handleErrorResponse(s){t().fire({position:"center",icon:"error",title:s.message,showConfirmButton:!1,timer:2e3})}}return(i=u).\u0275fac=function(s){return new(s||i)(e.Y36(m.qu),e.Y36(A.e))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-profile"]],viewQuery:function(s,c){if(1&s&&e.Gf(n,5),2&s){let f;e.iGM(f=e.CRH())&&(c.myButton=f.first)}},decls:123,vars:15,consts:[["id","mainVisitor",1,"main"],[1,"row"],[1,"col-10","offset-1","content-center"],[1,"pagetitle"],[1,"breadcrumb"],[1,"breadcrumb-item"],["routerLink","/solicitante/dashboard"],[1,"breadcrumb-item","active"],[1,"section","profile"],[1,"col-xl-12"],[1,"card"],[1,"card-body","pt-3"],[1,"nav","nav-tabs","nav-tabs-bordered"],[1,"nav-item"],["data-bs-toggle","tab","data-bs-target","#profile-overview",1,"nav-link","active"],["data-bs-toggle","tab","data-bs-target","#profile-edit",1,"nav-link"],["myButton",""],["data-bs-toggle","tab","data-bs-target","#profile-change-password",1,"nav-link"],[1,"tab-content","pt-2"],["id","profile-overview",1,"tab-pane","fade","show","active","profile-overview"],[1,"card-title"],[1,"col-lg-3","col-md-4","label"],[1,"col-lg-9","col-md-8"],["id","profile-edit",1,"tab-pane","fade","profile-edit","pt-3"],[3,"formGroup","ngSubmit"],[1,"row","mb-3"],["for","name",1,"col-md-4","col-lg-3","col-form-label","required"],[1,"col-md-8","col-lg-9"],["name","name","type","text","formControlName","name","id","name",1,"form-control"],["class","form-text text-danger form",4,"ngIf"],["for","curp",1,"col-md-4","col-lg-3","col-form-label","required"],["name","curp","type","text","id","curp","formControlName","curp",1,"form-control"],["for","rfc",1,"col-md-4","col-lg-3","col-form-label"],["name","rfc","type","text","id","rfc","formControlName","rfc",1,"form-control"],["for","birtdate",1,"col-md-4","col-lg-3","col-form-label","required"],["name","birtdate","type","date","id","birtdate","formControlName","birtdate",1,"form-control"],["for","phone_number",1,"col-md-4","col-lg-3","col-form-label","required"],["name","phone_number","type","text","id","phone_number","maxlength","10","minlength","10","formControlName","phone_number",1,"form-control"],[1,"text-center"],["type","submit",1,"btn","btn-primary"],["id","profile-change-password",1,"tab-pane","fade","pt-3"],["for","password",1,"col-md-4","col-lg-3","col-form-label"],["name","password","type","password","id","password","formControlName","password",1,"form-control"],["for","new_password",1,"col-md-4","col-lg-3","col-form-label"],["name","new_password","type","password","id","new_password","formControlName","new_password",1,"form-control"],["for","new_password_repeat",1,"col-md-4","col-lg-3","col-form-label"],["name","new_password_repeat","type","password","id","new_password_repeat","formControlName","new_password_repeat",1,"form-control"],[1,"card-footer"],[1,"form-text","text-danger","form"]],template:function(s,c){1&s&&(e.TgZ(0,"app-visitor")(1,"main",0)(2,"div",1)(3,"div",2)(4,"div",3)(5,"h1"),e._uU(6,"Mi perfil "),e.qZA(),e.TgZ(7,"nav")(8,"ol",4)(9,"li",5)(10,"a",6),e._uU(11,"Inicio"),e.qZA()(),e.TgZ(12,"li",7),e._uU(13,"Mi perfil"),e.qZA()()()(),e.TgZ(14,"section",8)(15,"div",1)(16,"div",9)(17,"div",10)(18,"div",11)(19,"ul",12)(20,"li",13)(21,"button",14),e._uU(22,"Descripci\xf3n general"),e.qZA()(),e.TgZ(23,"li",13)(24,"button",15,16),e._uU(26,"Editar perfil"),e.qZA()(),e.TgZ(27,"li",13)(28,"button",17),e._uU(29,"Cambiar contrase\xf1a"),e.qZA()()(),e.TgZ(30,"div",18)(31,"div",19)(32,"h5",20),e._uU(33,"Detalles de perfil"),e.qZA(),e.TgZ(34,"div",1)(35,"div",21),e._uU(36,"Nombre completo"),e.qZA(),e.TgZ(37,"div",22),e._uU(38),e.qZA()(),e.TgZ(39,"div",1)(40,"div",21),e._uU(41,"CURP"),e.qZA(),e.TgZ(42,"div",22),e._uU(43),e.qZA()(),e.TgZ(44,"div",1)(45,"div",21),e._uU(46,"RFC"),e.qZA(),e.TgZ(47,"div",22),e._uU(48),e.qZA()(),e.TgZ(49,"div",1)(50,"div",21),e._uU(51,"Email"),e.qZA(),e.TgZ(52,"div",22),e._uU(53),e.qZA()(),e.TgZ(54,"div",1)(55,"div",21),e._uU(56,"Fecha de nacimiento"),e.qZA(),e.TgZ(57,"div",22),e._uU(58),e.qZA()(),e.TgZ(59,"div",1)(60,"div",21),e._uU(61,"Telefono"),e.qZA(),e.TgZ(62,"div",22),e._uU(63),e.qZA()()(),e.TgZ(64,"div",23)(65,"form",24),e.NdJ("ngSubmit",function(){return c.onSubmit()}),e.TgZ(66,"div",25)(67,"label",26),e._uU(68,"Nombre completo"),e.qZA(),e.TgZ(69,"div",27),e._UZ(70,"input",28),e.qZA(),e.YNc(71,d,2,0,"span",29),e.qZA(),e.TgZ(72,"div",25)(73,"label",30),e._uU(74,"CURP"),e.qZA(),e.TgZ(75,"div",27),e._UZ(76,"input",31),e.qZA()(),e.TgZ(77,"div",25)(78,"label",32),e._uU(79,"RFC"),e.qZA(),e.TgZ(80,"div",27),e._UZ(81,"input",33),e.qZA(),e.YNc(82,g,2,0,"span",29),e.qZA(),e.TgZ(83,"div",25)(84,"label",34),e._uU(85,"Fecha de nacimiento"),e.qZA(),e.TgZ(86,"div",27),e._UZ(87,"input",35),e.qZA(),e.YNc(88,_,2,0,"span",29),e.qZA(),e.TgZ(89,"div",25)(90,"label",36),e._uU(91,"Telefono"),e.qZA(),e.TgZ(92,"div",27),e._UZ(93,"input",37),e.qZA(),e.YNc(94,U,2,0,"span",29),e.qZA(),e.TgZ(95,"div",38)(96,"button",39),e._uU(97,"Guardar cambios"),e.qZA()()()(),e.TgZ(98,"div",40)(99,"form",24),e.NdJ("ngSubmit",function(){return c.changePassword()}),e.TgZ(100,"div",25)(101,"label",41),e._uU(102,"Contrase\xf1a actual"),e.qZA(),e.TgZ(103,"div",27),e._UZ(104,"input",42),e.qZA(),e.YNc(105,F,2,0,"span",29),e.qZA(),e.TgZ(106,"div",25)(107,"label",43),e._uU(108,"Nueva contrase\xf1a"),e.qZA(),e.TgZ(109,"div",27),e._UZ(110,"input",44),e.qZA(),e.YNc(111,q,2,0,"span",29),e.qZA(),e.TgZ(112,"div",25)(113,"label",45),e._uU(114,"Repetir nueva contrase\xf1a"),e.qZA(),e.TgZ(115,"div",27),e._UZ(116,"input",46),e.qZA(),e.YNc(117,P,2,0,"span",29),e.qZA(),e.TgZ(118,"div",38)(119,"button",39),e._uU(120,"Cambiar contrase\xf1a"),e.qZA()()()()()(),e.TgZ(121,"div",47),e._UZ(122,"app-important-archievement"),e.qZA()()()()()()()()()),2&s&&(e.xp6(38),e.hij("",c.miFormulario.controls.name.value," "),e.xp6(5),e.hij("",c.miFormulario.controls.curp.value," "),e.xp6(5),e.hij(" ",c.miFormulario.controls.rfc.value,""),e.xp6(5),e.hij("",c.miFormulario.controls.email.value," "),e.xp6(5),e.hij(" ",c.miFormulario.controls.birtdate.value," "),e.xp6(5),e.hij(" ",c.miFormulario.controls.phone_number.value,""),e.xp6(2),e.Q6J("formGroup",c.miFormulario),e.xp6(6),e.Q6J("ngIf",c.miFormulario.controls.name.errors&&c.miFormulario.controls.name.touched),e.xp6(11),e.Q6J("ngIf",c.miFormulario.controls.rfc.errors&&c.miFormulario.controls.rfc.touched),e.xp6(6),e.Q6J("ngIf",c.miFormulario.controls.birtdate.errors&&c.miFormulario.controls.birtdate.touched),e.xp6(6),e.Q6J("ngIf",c.miFormulario.controls.phone_number.errors&&c.miFormulario.controls.phone_number.touched),e.xp6(5),e.Q6J("formGroup",c.miFormularioPassword),e.xp6(6),e.Q6J("ngIf",c.miFormularioPassword.controls.password.errors&&c.miFormularioPassword.controls.password.touched),e.xp6(6),e.Q6J("ngIf",c.miFormularioPassword.controls.new_password.errors&&c.miFormularioPassword.controls.new_password.touched),e.xp6(6),e.Q6J("ngIf",c.miFormularioPassword.controls.new_password_repeat.errors&&c.miFormularioPassword.controls.new_password_repeat.touched))},dependencies:[r.O5,b.rH,m._Y,m.Fj,m.JJ,m.JL,m.wO,m.nD,m.sg,m.u,Z.C,o.b],styles:[".flex-container[_ngcontent-%COMP%] {\n            display: flex;\n            justify-content: space-between;\n            align-items: center;\n        }"]}),u})()},{path:"**",redirectTo:"dashboard"}];let h=(()=>{var i;class u{}return(i=u).\u0275fac=function(s){return new(s||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[b.Bz.forChild(C),b.Bz]}),u})(),l=(()=>{var i;class u{}return(i=u).\u0275fac=function(s){return new(s||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[r.ez,h,m.UX]}),u})()}}]);