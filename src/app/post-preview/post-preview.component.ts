import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Post } from '../post';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent {
  
  @Input() post: Post;
  
  constructor(
    private _userService: UserService
     
  ){}

  /*=========================================================================|
  | Red Path                                                                 |
  |==========================================================================|
  | Expón un atributo de salida con el decorador correspondiente. El tipo de |
  | este atributo debe permitir la emisión de eventos; la idea es enviar al  |
  | componente padre el usuario sobre el cuál se ha hecho clic. Y puesto que |
  | dicho clic se realiza en el template de este componente, necesitas,      |
  | además, un manejador para el mismo.                                      |
  |=========================================================================*/


  /*=========================================================================|
  | Green Path                                                               |
  |==========================================================================|
  | Expón un atributo de salida con el decorador correspondiente. El tipo de |
  | este atributo debe permitir la emisión de eventos; la idea es enviar al  |
  | componente padre el post sobre el cuál se ha hecho clic. Y puesto que    |
  | dicho clic se realiza en el template de este componente, necesitas,      |
  | además, un manejador para el mismo.                                      |
  |=========================================================================*/

  @Output() postEditado= new EventEmitter <Post>();
  @Output() autorSeleccionado = new EventEmitter <Post>();
  @Output() postSeleccionado = new EventEmitter <Post>();

  checkUserDefault(id: number):boolean{
   return id===this._userService.getDefaultUser().id;
  }

  notificarEdicionPost(post:Post):void{
    this.postEditado.emit(post);
  }

  notificarSeleccionAutor(post: Post): void{
    this.autorSeleccionado.emit(post);
    
    }

  notificarSeleccionPost(post: Post): void{
    this.postSeleccionado.emit(post);
  }

  plainTextToHtml(text: string): string {
    return text ? `<p>${text.replace(/\n/gi, '</p><p>')}</p>` : '';
  }

}
