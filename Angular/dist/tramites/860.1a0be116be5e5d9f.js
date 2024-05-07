"use strict";(self.webpackChunkTramites=self.webpackChunkTramites||[]).push([[860],{9860:(F,f,c)=>{c.r(f),c.d(f,{AuthModule:()=>x});var g=c(6814),i=c(95),m=c(3518),h=c(3519),s=c.n(h),e=c(4946),p=c(4567);function v(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"El correo electr\xf3nico es requerido."),e.qZA())}function _(o,a){1&o&&(e.TgZ(0,"div"),e._uU(1,"Por favor, ingresa un correo electr\xf3nico v\xe1lido."),e.qZA())}function Z(o,a){if(1&o&&(e.TgZ(0,"div",38),e.YNc(1,v,2,0,"div",39),e.YNc(2,_,2,0,"div",39),e.qZA()),2&o){e.oxw();const u=e.MAs(54);e.xp6(1),e.Q6J("ngIf",null==u.errors?null:u.errors.required),e.xp6(1),e.Q6J("ngIf",null==u.errors?null:u.errors.pattern)}}function C(o,a){1&o&&(e.TgZ(0,"span",27),e._uU(1," CURP inv\xe1lida. "),e.qZA())}function y(o,a){1&o&&(e.TgZ(0,"span",28),e._uU(1," Por favor ingrese un correo electr\xf3nico v\xe1lido. "),e.qZA())}function T(o,a){1&o&&(e.TgZ(0,"span",28),e._uU(1," Por favor ingresa tu contrase\xf1a. "),e.qZA())}function A(o,a){1&o&&(e.TgZ(0,"span",28),e._uU(1," Por favor ingresa de nuevo la contrase\xf1a. "),e.qZA())}const w=[{path:"",children:[{path:"login",component:(()=>{var o;class a{constructor(n,t,r){this.fb=n,this.router=t,this.authService=r,this.miFormulario=this.fb.group({curp:["",[i.kI.required,i.kI.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/),i.kI.minLength(18),i.kI.maxLength(18)]],password:["",[i.kI.required,i.kI.minLength(6)]]})}ngOnInit(){}login(){const{curp:n,password:t}=this.miFormulario.value;this.authService.login(n,t).subscribe(r=>{!0===r.ok?this.router.navigateByUrl("/solicitante/dashboard"):400==r.status?s().fire({title:"Correo electr\xf3nico no verificado o la verificaci\xf3n expir\xf3. \xbfQuieres verificarlo?",showDenyButton:!0,confirmButtonText:"Verificar",denyButtonText:"No verificar"}).then(l=>{l.isConfirmed?this.authService.resendVerificationEmail(r.email).subscribe({next:d=>{200==d.code?(s().fire({position:"center",icon:"success",title:d.message,showConfirmButton:!0}),this.router.navigateByUrl("/auth/verificar/"+d.email)):s().fire({position:"center",icon:"error",title:d.error.message,showConfirmButton:!0})},error:d=>{console.log(d)}}):l.isDenied&&this.router.navigateByUrl("/auth/login")}):r?.error?.message&&s().fire({position:"center",icon:"error",title:r?.error?.message,showConfirmButton:!0})})}sendEmail(){this.authService.sendResetMenssage({email:this.emailReset}).subscribe({next:n=>{200==n.code?(s().fire({position:"center",icon:"success",title:n.message,showConfirmButton:!0}),this.router.navigateByUrl("/auth/login")):401==n.code&&s().fire({position:"center",icon:"error",title:n.message,showConfirmButton:!1,timer:2e3})},error:n=>{s().fire({position:"center",icon:"error",title:n.message,showConfirmButton:!1,timer:2e3})}})}}return(o=a).\u0275fac=function(n){return new(n||o)(e.Y36(i.qu),e.Y36(m.F0),e.Y36(p.e))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-login"]],decls:61,vars:4,consts:[[1,"container"],[1,"section","register","min-vh-100","d-flex","flex-column","align-items-center","justify-content-center","py-4"],[1,"row","justify-content-center"],[1,"col-lg-4","col-md-6","d-flex","flex-column","align-items-center","justify-content-center"],[1,"card","mb-3"],[1,"card-body"],[1,"pt-4","pb-2"],[1,"d-flex",2,"place-content","center"],["src","assets/img/logo_comude.png","width","300px"],[1,"card-title","text-center","pb-0","fs-4"],[1,"row","g-3","needs-validation",3,"formGroup","ngSubmit"],[1,"col-12"],["for","yourUsername",1,"form-label"],[1,"input-group","has-validation"],["type","text","name","username","id","yourUsername","formControlName","curp","minlength","18","maxlength","18",1,"form-control",3,"input"],[1,"invalid-feedback"],["for","yourPassword",1,"form-label"],["type","password","name","password","id","yourPassword","formControlName","password",1,"form-control"],["type","submit",1,"btn","btn-primary","w-100"],["routerLink","/",1,"btn","btn-danger","w-100"],[1,"bi","bi-house-door-fill"],[1,"small","mb-0"],["routerLink","/auth/registrar"],["data-bs-toggle","modal","data-bs-target","#resetPassword","href","#"],["id","resetPassword","tabindex","-1","role","dialog","aria-labelledby","resetPasswordLabel","aria-hidden","true",1,"modal","fade"],["role","document",1,"modal-dialog","modal-dialog-centered","modal-dialog-scrollable","modal-md"],[1,"modal-content","rounded-4","shadow"],[1,"modal-header","border-bottom-0"],["id","serviceModalLabel",1,"modal-title"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close"],[1,"modal-body","py-0","m-2","text-justify-custom"],["for","inputEmail"],["name","username","id","inputEmail","type","email","required","","pattern","[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}",1,"form-control",3,"ngModel","ngModelChange"],["emailInput","ngModel"],["class","text-danger",4,"ngIf"],[1,"modal-footer","border-top-0"],["type","button","data-bs-dismiss","modal",1,"btn","btn-secondary"],["type","button",1,"btn","btn-primary",3,"disabled","click"],[1,"text-danger"],[4,"ngIf"]],template:function(n,t){if(1&n&&(e.TgZ(0,"main")(1,"div",0)(2,"section",1)(3,"div",0)(4,"div",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"a",7),e._UZ(10,"img",8),e.qZA(),e.TgZ(11,"h5",9),e._uU(12,"SOLICITUD DE BECA DEPORTIVA"),e.qZA()(),e.TgZ(13,"form",10),e.NdJ("ngSubmit",function(){return t.login()}),e.TgZ(14,"div",11)(15,"label",12),e._uU(16,"CURP"),e.qZA(),e.TgZ(17,"div",13)(18,"input",14),e.NdJ("input",function(){return t.miFormulario.controls.curp.setValue(t.miFormulario.controls.curp.value.toUpperCase())}),e.qZA(),e.TgZ(19,"div",15),e._uU(20,"Por favor ingrese su CURP."),e.qZA()()(),e.TgZ(21,"div",11)(22,"label",16),e._uU(23,"Contrase\xf1a"),e.qZA(),e._UZ(24,"input",17),e.TgZ(25,"div",15),e._uU(26,"Por favor ingresa tu contrase\xf1a."),e.qZA()(),e.TgZ(27,"div",11)(28,"button",18),e._uU(29,"Ingresar"),e.qZA()(),e.TgZ(30,"div",11)(31,"button",19),e._UZ(32,"i",20),e._uU(33," Regresar a inicio"),e.qZA()(),e.TgZ(34,"div",11)(35,"p",21),e._uU(36,"\xbfNo tienes cuenta? "),e.TgZ(37,"a",22),e._uU(38,"Crear una cuenta"),e.qZA()(),e.TgZ(39,"p",21),e._uU(40,"\xbfOlvidaste tu contrase\xf1a? "),e.TgZ(41,"a",23),e._uU(42,"Restablecer"),e.qZA()()()()()()()()()()()(),e.TgZ(43,"div",24)(44,"div",25)(45,"div",26)(46,"div",27)(47,"h5",28),e._uU(48,"Restablecer contrase\xf1a"),e.qZA(),e._UZ(49,"button",29),e.qZA(),e.TgZ(50,"div",30)(51,"label",31),e._uU(52,"Correo electr\xf3nico"),e.qZA(),e.TgZ(53,"input",32,33),e.NdJ("ngModelChange",function(l){return t.emailReset=l}),e.qZA(),e.YNc(55,Z,3,2,"div",34),e.qZA(),e.TgZ(56,"div",35)(57,"button",36),e._uU(58,"Cancelar"),e.qZA(),e.TgZ(59,"button",37),e.NdJ("click",function(){return t.sendEmail()}),e._uU(60," Enviar correo "),e.qZA()()()()()),2&n){const r=e.MAs(54);e.xp6(13),e.Q6J("formGroup",t.miFormulario),e.xp6(40),e.Q6J("ngModel",t.emailReset),e.xp6(2),e.Q6J("ngIf",r.invalid&&(r.dirty||r.touched)),e.xp6(4),e.Q6J("disabled",r.invalid||r.pristine)}},dependencies:[g.O5,m.rH,i._Y,i.Fj,i.JJ,i.JL,i.Q7,i.wO,i.nD,i.c5,i.sg,i.u,i.On],styles:["\n\n   .modal-body[_ngcontent-%COMP%] {\n      padding: 1rem;\n   }"]}),a})()},{path:"registrar",component:(()=>{var o;class a{constructor(n,t,r){this.fb=n,this.router=t,this.authService=r,this.miFormulario=this.fb.group({email:["",[i.kI.required,i.kI.email]],curp:["",[i.kI.required,i.kI.pattern(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[0-9A-Z]{2}$/)]],password:["",[i.kI.required,i.kI.minLength(6)]],password_confirmation:["",[i.kI.required,i.kI.minLength(6)]]})}ngOnInit(){}register(){let n=this.miFormulario.value;this.authService.register(n).subscribe({next:t=>{200==t.code?(s().fire({position:"center",icon:"success",title:t.message,showConfirmButton:!0}),this.router.navigateByUrl("/auth/verificar/"+n.email)):409==t.code&&s().fire({position:"center",icon:"error",title:t.message,showConfirmButton:!0})},error:t=>{s().fire("Error","error")}})}}return(o=a).\u0275fac=function(n){return new(n||o)(e.Y36(i.qu),e.Y36(m.F0),e.Y36(p.e))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-register"]],decls:45,vars:6,consts:[[1,"container"],[1,"section","register","min-vh-100","d-flex","flex-column","align-items-center","justify-content-center","py-4"],[1,"row","justify-content-center"],[1,"col-lg-4","col-md-6","d-flex","flex-column","align-items-center","justify-content-center"],[1,"card","mb-3"],[1,"card-body"],[1,"pt-4","pb-2"],[1,"d-flex",2,"place-content","center"],["src","assets/img/logo_comude.png","width","300px"],[1,"card-title","text-center","pb-0","fs-4"],[1,"row","g-3","needs-validation",3,"formGroup","ngSubmit"],[1,"col-12"],[1,"form-label","required"],["type","text","formControlName","curp",1,"form-control",3,"input"],["class","form-text text-danger",4,"ngIf"],["for","yourUsername",1,"form-label"],["name","username","id","yourUsername","type","email","formControlName","email","maxlength","255",1,"form-control"],[1,"input-group","has-validation"],["class","form-text text-danger form",4,"ngIf"],["for","yourPassword",1,"form-label"],["type","password","name","password","id","yourPassword","formControlName","password","maxlength","255",1,"form-control"],[1,"form-label"],["type","password","name","repeatPassword","formControlName","password_confirmation",1,"form-control"],["type","submit",1,"btn","btn-primary","w-100",3,"disabled"],[1,"col-12","text-center"],[1,"small","mb-0"],["routerLink","/auth/login"],[1,"form-text","text-danger"],[1,"form-text","text-danger","form"]],template:function(n,t){1&n&&(e.TgZ(0,"main")(1,"div",0)(2,"section",1)(3,"div",0)(4,"div",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"a",7),e._UZ(10,"img",8),e.qZA(),e.TgZ(11,"h5",9),e._uU(12,"REGISTRO DE USUARIO"),e.qZA()(),e.TgZ(13,"form",10),e.NdJ("ngSubmit",function(){return t.register()}),e.TgZ(14,"div",11)(15,"label",12),e._uU(16,"CURP"),e.qZA(),e.TgZ(17,"input",13),e.NdJ("input",function(){return t.miFormulario.controls.curp.setValue(t.miFormulario.controls.curp.value.toUpperCase())}),e.qZA(),e.YNc(18,C,2,0,"span",14),e.qZA(),e.TgZ(19,"div",11)(20,"label",15),e._uU(21,"Correo electr\xf3nico"),e.qZA(),e._UZ(22,"input",16),e.TgZ(23,"div",17),e.YNc(24,y,2,0,"span",18),e.qZA()(),e.TgZ(25,"div",11)(26,"label",19),e._uU(27,"Contrase\xf1a"),e.qZA(),e._UZ(28,"input",20),e.TgZ(29,"div",17),e.YNc(30,T,2,0,"span",18),e.qZA()(),e.TgZ(31,"div",11)(32,"label",21),e._uU(33,"Confirmar Contrase\xf1a"),e.qZA(),e._UZ(34,"input",22),e.TgZ(35,"div",17),e.YNc(36,A,2,0,"span",18),e.qZA()(),e.TgZ(37,"div",11)(38,"button",23),e._uU(39,"Registrar"),e.qZA()(),e.TgZ(40,"div",24)(41,"p",25),e._uU(42,"\xbfTienes cuenta? "),e.TgZ(43,"a",26),e._uU(44,"Iniciar sesion"),e.qZA()()()()()()()()()()()()),2&n&&(e.xp6(13),e.Q6J("formGroup",t.miFormulario),e.xp6(5),e.Q6J("ngIf",t.miFormulario.controls.curp.invalid&&t.miFormulario.controls.curp.touched),e.xp6(6),e.Q6J("ngIf",t.miFormulario.controls.email.errors&&t.miFormulario.controls.email.touched),e.xp6(6),e.Q6J("ngIf",t.miFormulario.controls.password.errors&&t.miFormulario.controls.password.touched),e.xp6(6),e.Q6J("ngIf",t.miFormulario.controls.password_confirmation.errors&&t.miFormulario.controls.password_confirmation.touched),e.xp6(2),e.Q6J("disabled",t.miFormulario.invalid))},dependencies:[g.O5,m.rH,i._Y,i.Fj,i.JJ,i.JL,i.nD,i.sg,i.u]}),a})()},{path:"restablecer/:token/:email",component:(()=>{var o;class a{constructor(n,t,r,l){this.route=n,this.fb=t,this.router=r,this.authService=l,this.miFormulario=this.fb.group({password:["",[i.kI.required,i.kI.minLength(6)]],password_confirmation:["",[i.kI.required,i.kI.minLength(6)]]})}ngOnInit(){this.getParams()}getParams(){this.route.params.subscribe(n=>{this.email=n.email,this.token=n.token})}reset(){let n=this.miFormulario.value;n.email=this.email,n.token=this.token,this.authService.resetPassword(n,this.token).subscribe({next:t=>{t.message&&t.success?(s().fire({position:"center",icon:"success",title:t.message,showConfirmButton:!0}),this.router.navigateByUrl("/auth/login")):s().fire({position:"center",icon:"error",title:t.error,showConfirmButton:!0})},error:t=>{422===t.status?s().fire({position:"center",icon:"error",title:t.message,showConfirmButton:!1,timer:2e3}):s().fire("Error","error")}})}}return(o=a).\u0275fac=function(n){return new(n||o)(e.Y36(m.gz),e.Y36(i.qu),e.Y36(m.F0),e.Y36(p.e))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-reset"]],decls:33,vars:2,consts:[[1,"container"],[1,"section","register","min-vh-100","d-flex","flex-column","align-items-center","justify-content-center","py-4"],[1,"row","justify-content-center"],[1,"col-lg-4","col-md-6","d-flex","flex-column","align-items-center","justify-content-center"],[1,"card","mb-3"],[1,"card-body"],[1,"pt-4","pb-2"],[1,"d-flex","justify-content-center"],["src","assets/img/logo_comude.png","width","300px"],[1,"card-title","text-center","pb-0","fs-4"],[1,"row","g-3","needs-validation",3,"formGroup"],[1,"col-12"],["for","yourPassword",1,"form-label"],["type","password","name","password","id","yourPassword","formControlName","password",1,"form-control"],[1,"invalid-feedback"],[1,"form-label"],["type","password","name","repeatPassword","formControlName","password_confirmation",1,"form-control"],["type","submit",1,"btn","btn-primary","w-100",3,"disabled","click"],[1,"col-12","text-center"],[1,"small","mb-0"],["routerLink","/auth/login"]],template:function(n,t){1&n&&(e.TgZ(0,"main")(1,"div",0)(2,"section",1)(3,"div",0)(4,"div",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"a",7),e._UZ(10,"img",8),e.qZA(),e.TgZ(11,"h5",9),e._uU(12,"RESTABLECER CONTRASE\xd1A"),e.qZA()(),e.TgZ(13,"form",10)(14,"div",11)(15,"label",12),e._uU(16,"Nueva contrase\xf1a"),e.qZA(),e._UZ(17,"input",13),e.TgZ(18,"div",14),e._uU(19,"Por favor ingresa tu contrase\xf1a."),e.qZA()(),e.TgZ(20,"div",11)(21,"label",15),e._uU(22,"Confirmar contrase\xf1a"),e.qZA(),e._UZ(23,"input",16),e.TgZ(24,"div",14),e._uU(25,"Por favor ingresa tu contrase\xf1a."),e.qZA()(),e.TgZ(26,"div",11)(27,"button",17),e.NdJ("click",function(){return t.reset()}),e._uU(28,"Confirmar contrase\xf1a"),e.qZA()(),e.TgZ(29,"div",18)(30,"p",19)(31,"a",20),e._uU(32,"Iniciar sesi\xf3n"),e.qZA()()()()()()()()()()()()),2&n&&(e.xp6(13),e.Q6J("formGroup",t.miFormulario),e.xp6(14),e.Q6J("disabled",t.miFormulario.invalid))},dependencies:[m.rH,i._Y,i.Fj,i.JJ,i.JL,i.sg,i.u]}),a})()},{path:"verificar/:email",component:(()=>{var o;class a{constructor(n,t,r){this.router=n,this.route=t,this.authService=r,this.inputValues=["","","","",""]}ngOnInit(){this.getParams()}moveToNextInput(n){document.getElementsByClassName("verification-input")[n].focus()}getParams(){this.route.params.subscribe(n=>{this.email=n.email})}resendEmailVerify(){this.authService.sendResetMenssage({email:this.email}).subscribe({next:n=>{200==n.code?(s().fire({position:"center",icon:"success",title:n.message,showConfirmButton:!1,timer:2e3}),this.router.navigateByUrl("/auth/login")):401==n.code&&s().fire({position:"center",icon:"error",title:n.message,showConfirmButton:!1,timer:2e3})},error:n=>{s().fire({position:"center",icon:"error",title:n.message,showConfirmButton:!1,timer:2e3})}})}submitForm(){const n=this.inputValues.join("");this.authService.verificationEmail({token:n},this.email).subscribe({next:t=>{200==t.code?(s().fire({position:"center",icon:"success",title:t.message}),this.router.navigateByUrl("/auth/login")):(s().fire({position:"center",icon:"error",title:t.error.message,showConfirmButton:!0}),this.clearInputs())},error:t=>{console.log(t),404==t.status?(s().fire({position:"center",icon:"error",title:t.error.message,showConfirmButton:!1,timer:2e3}),this.clearInputs()):(s().fire("Error","error"),this.clearInputs())}})}clearInputs(){this.inputValues=["","","","",""]}}return(o=a).\u0275fac=function(n){return new(n||o)(e.Y36(m.F0),e.Y36(m.gz),e.Y36(p.e))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-verify"]],decls:22,vars:6,consts:[[1,"container"],[1,"section","register","min-vh-100","d-flex","flex-column","align-items-center","justify-content-center","py-4"],[1,"row","justify-content-center"],[1,"col-lg-4","col-md-6","d-flex","flex-column","align-items-center","justify-content-center"],[1,"card","mb-3"],[1,"card-body"],[1,"pt-4","pb-2","text-center"],[1,"d-flex","justify-content-center"],["src","assets/img/logo_comude.png","width","300px"],[1,"card-title","text-center","pb-0","fs-4"],[3,"ngSubmit"],[1,"verification-inputs"],["type","text","maxlength","1","name","input0",1,"verification-input",3,"ngModel","ngModelChange","input"],["type","text","maxlength","1","name","input1",1,"verification-input",3,"ngModel","ngModelChange","input"],["type","text","maxlength","1","name","input2",1,"verification-input",3,"ngModel","ngModelChange","input"],["type","text","maxlength","1","name","input3",1,"verification-input",3,"ngModel","ngModelChange","input"],["type","text","maxlength","1","name","input4",1,"verification-input",3,"ngModel","ngModelChange","input"]],template:function(n,t){1&n&&(e.TgZ(0,"main")(1,"div",0)(2,"section",1)(3,"div",0)(4,"div",2)(5,"div",3)(6,"div",4)(7,"div",5)(8,"div",6)(9,"a",7),e._UZ(10,"img",8),e.qZA(),e.TgZ(11,"h5",9),e._uU(12,"VERIFICACI\xd3N DE CUENTA"),e.qZA(),e.TgZ(13,"p"),e._uU(14),e.qZA(),e.TgZ(15,"form",10),e.NdJ("ngSubmit",function(){return t.submitForm()}),e.TgZ(16,"div",11)(17,"input",12),e.NdJ("ngModelChange",function(l){return t.inputValues[0]=l})("input",function(){return t.moveToNextInput(1)}),e.qZA(),e.TgZ(18,"input",13),e.NdJ("ngModelChange",function(l){return t.inputValues[1]=l})("input",function(){return t.moveToNextInput(2)}),e.qZA(),e.TgZ(19,"input",14),e.NdJ("ngModelChange",function(l){return t.inputValues[2]=l})("input",function(){return t.moveToNextInput(3)}),e.qZA(),e.TgZ(20,"input",15),e.NdJ("ngModelChange",function(l){return t.inputValues[3]=l})("input",function(){return t.moveToNextInput(4)}),e.qZA(),e.TgZ(21,"input",16),e.NdJ("ngModelChange",function(l){return t.inputValues[4]=l})("input",function(){return t.submitForm()}),e.qZA()()()()()()()()()()()()),2&n&&(e.xp6(14),e.hij('"Para verificar la cuenta, ingresa el c\xf3digo de verificaci\xf3n que se envi\xf3 a tu correo electr\xf3nico ',t.email,"."),e.xp6(3),e.Q6J("ngModel",t.inputValues[0]),e.xp6(1),e.Q6J("ngModel",t.inputValues[1]),e.xp6(1),e.Q6J("ngModel",t.inputValues[2]),e.xp6(1),e.Q6J("ngModel",t.inputValues[3]),e.xp6(1),e.Q6J("ngModel",t.inputValues[4]))},dependencies:[i._Y,i.Fj,i.JJ,i.JL,i.nD,i.On,i.F],styles:[".verification-inputs[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: center;\n        \n\n        align-items: center;\n        \n\n    }\n\n    .verification-input[_ngcontent-%COMP%] {\n        width: 3rem;\n        height: 3rem;\n        \n\n        text-align: center;\n        margin: 0 0.5rem;\n        \n\n        border: 1px solid #ccc;\n        \n\n        border-radius: 8px;\n        \n\n    }"]}),a})()},{path:"**",redirectTo:"login"}]}];let U=(()=>{var o;class a{}return(o=a).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[m.Bz.forChild(w),m.Bz]}),a})(),x=(()=>{var o;class a{}return(o=a).\u0275fac=function(n){return new(n||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[g.ez,U,i.UX,i.u5]}),a})()}}]);