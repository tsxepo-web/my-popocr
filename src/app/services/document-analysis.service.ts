import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentAnalysisService {
  private apiUrl = "https://popocr.azurewebsites.net/api//DocumentAnalysis/analyze-file";
  constructor(private http: HttpClient) { }

  analyseDocument(file: any) : Observable<any> {
    return this.http.post(this.apiUrl, file)
  }
}
