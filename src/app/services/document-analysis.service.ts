import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentAnalysisService {
  private apiUrl = 'https://popocr.azurewebsites.net/api/DocumentAnalysis';
  constructor(private http: HttpClient) {}

  analyseDocument(file: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/analyze-file`, file);
  }

  saveExtractedText(text: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(
      `${this.apiUrl}/save-text-to-word`,
      JSON.stringify(text),
      {
        headers: headers,
        responseType: 'blob',
      }
    );
  }

  saveTables(tables: string[][]): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/save-tables-to-excel`, tables, {
      headers: headers,
      responseType: 'blob',
    });
  }
}
