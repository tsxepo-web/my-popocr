import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtractTextService {
  private apiUrl = 'https://popocr.azurewebsites.net/api/PopOcr/extract-text';
  constructor(private http: HttpClient) { }

  extractText(file: any) : Observable<any> {
    return this.http.post(this.apiUrl, file);
  }  
}
