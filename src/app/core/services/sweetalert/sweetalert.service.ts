import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

import { ISweetAlert } from '../../models/sweet-alert';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  constructor() { }

  /**
   * Show alert with message generic
   * @param data
   */
  public showMessage(data: ISweetAlert) {
    const Message = Swal.mixin({
      toast: true,
      position: (data.position) ? data.position : 'top-end',

      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      showCloseButton: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Message.fire({
      icon: data.icon,
      title: data.title
    })
  }
}
