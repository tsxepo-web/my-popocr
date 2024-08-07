import { Component } from '@angular/core';
import { ReceiptAnalysisService } from '../../services/receipt-analysis.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-analyze-receipt',
  standalone: true,
  imports: [NgIf],
  templateUrl: './analyze-receipt.component.html',
  styleUrl: './analyze-receipt.component.css'
})
export class AnalyzeReceiptComponent {
  selectedFile: File | null = null;
  extractedReceipt: string | null = null;

  constructor(private receiptModelService: ReceiptAnalysisService) {}

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
      
      this.receiptModelService.analyzeReceipt(formData).subscribe({
        next: (response) => {
          console.log(response);
          this.extractedReceipt = response.analyzeResult.content;
        },
        error: (err) => {
          console.error('Error uploading file', err);
        }
      });
    }
  }
}
