import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ExtractTextService } from '../../services/extract-text.service';

@Component({
  selector: 'app-extract-text',
  standalone: true,
  imports: [NgIf],
  templateUrl: './extract-text.component.html',
  styleUrl: './extract-text.component.css'
})
export class ExtractTextComponent {
  selectedFile: File | null = null;
  extractedText: string | null = null;

  constructor(private extractTextService: ExtractTextService) {}

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
      
      this.extractTextService.extractText(formData).subscribe({
        next: (response) => {
          this.extractedText = response.text;
        },
        error: (err) => {
          console.error('Error uploading file', err);
        }
      });
    }
  }
}
