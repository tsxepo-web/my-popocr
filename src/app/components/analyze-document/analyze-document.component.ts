import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DocumentAnalysisService } from '../../services/document-analysis.service';

@Component({
  selector: 'app-analyze-document',
  standalone: true,
  imports: [NgIf],
  templateUrl: './analyze-document.component.html',
  styleUrl: './analyze-document.component.css'
})
export class AnalyzeDocumentComponent {
  selectedFile: File | null = null;
  extractedDocument: string | null = null;

  constructor(private docmodelService: DocumentAnalysisService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      this.docmodelService.analyseDocument(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.extractedDocument = response.analyzeResult.content;
        },
        error: (err) => {
          console.error('Error uploading file', err);
        }
      });
    }
  }
}
