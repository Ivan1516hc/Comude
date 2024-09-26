import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { AllService } from '../../services/all.service';

@Component({
  selector: 'app-sending-messages',
  templateUrl: './sending-messages.component.html',
  styleUrls: ['./sending-messages.component.css']
})
export class SendingMessagesComponent {
  motivosMessage: any[] = [];
  motivoMessage: any;
  lugarCorreccion: any;
  documentCorreccion: any;
  showHistory: any;
  newMessage: any;

  // item: any;
  @Input() item:any;

  typeForms: any[] = [];
  type_documents: any[] = [];
  historyMessages: any[] = [];

  @Output() changeStatus: EventEmitter<any> = new EventEmitter<any>();

  constructor(private allService: AllService, private elementRef: ElementRef) { }

  toggleHistory() {

  }

  ngOnInit(): void {
    // this.allService.historyMessage(this.item.id).subscribe({
    this.allService.historyMessage(1).subscribe({
      next: (response) => {
        this.motivosMessage = response.message_motive;
        this.historyMessages = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  sendMessage() {
    if (this.newMessage == '' || this.motivoMessage == '') {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes de escribir un mensaje y seleccionar un motivo para poder enviar el correo.',
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }
    if (this.motivoMessage == 4 && this.lugarCorreccion == '') {
      Swal.fire({
        position: 'center',
        icon: 'info',
        title: 'Debes de seleccionar un formulario para la corrección.',
        showConfirmButton: false,
        timer: 2000
      })
      return;
    }


    // const body = { 'message': this.newMessage, 'request_id': this.item.id, 'message_motive_id': this.motivoMessage, 'form_id': this.lugarCorreccion };
    const body = { 'message': this.newMessage, 'request_id': 1, 'message_motive_id': this.motivoMessage, 'form_id': this.lugarCorreccion };
    this.allService.sendMessageToRequest(body).subscribe({
      next: (response) => {
        if (response.code == 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: response.message,
            showConfirmButton: false,
            timer: 2000
          })
          this.newMessage = null;
          this.motivoMessage = null;
          this.changeStatus.emit();
        } else {
          Swal.fire({
            position: 'center',
            icon: 'info',
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
          title: err.message,
          showConfirmButton: false,
          timer: 2000
        })
      }
    });
  }

}
