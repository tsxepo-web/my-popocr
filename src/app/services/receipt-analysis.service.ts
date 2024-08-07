import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptAnalysisService {
  private apiUrl = 'https://popocr.azurewebsites.net/api/ReceiptAnalysis/analyze-receipt';
  constructor(private http: HttpClient) { }

  analyzeReceipt(file: any) : Observable<any> {
    return this.http.post(this.apiUrl, file)
  }
}
