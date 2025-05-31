import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http:HttpClient
  ) { }

  getHttp(url:string){
    return this.http.get(url)
  }
  postHttp(url:string,body:any){
    return this.http.post(url, body);
  }
}
