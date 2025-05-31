import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class OlpService {

  constructor(
    private httpServices:HttpService
  ) { }

  getOLP(url:string){
    return this.httpServices.getHttp(url)
  }
  postOLP(url:string,data:any) {
    return this.httpServices.postHttp(url,data)
  }
}
