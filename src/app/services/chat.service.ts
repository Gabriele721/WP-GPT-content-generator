import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _apiKey: string = 'YOUR_KEY';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this._apiKey
  });

  constructor(private http: HttpClient) { }

  get apiKey(): string {
    return this._apiKey;
  }

  set apiKey(value: string) {
    this._apiKey = value;
  }

  generateContent(prompt: string): Observable<any>   {

    const url = 'https://api.openai.com/v1/completions';
    const body = {"model": "text-davinci-003", "prompt": prompt, "temperature": 0.4, "max_tokens": 512};

    return this.http.post(url, body, { headers: this.headers }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(() => new Error(error.message));
  }

}
