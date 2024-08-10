import { NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DocumentAnalysisService } from '../../services/document-analysis.service';
import { NgxImageCompressService } from 'ngx-image-compress';

@Component({
  selector: 'app-analyze-document',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './analyze-document.component.html',
  styleUrls: ['./analyze-document.component.css'],
})
export class AnalyzeDocumentComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  selectedFile: File | null = null;
  extractedDocumenxt: string | null = null;
  placeholderImages: string[] = [
    'Battle-Hero.JPG',
    'peginv.jpg',
    'maths.jpg',
    'id_card.jpg',
  ];
  currentPlaceholderImage: string = this.placeholderImages[1];
  imagePreview: string | ArrayBuffer | null = null;
  imageSelected: boolean = false;
  tables: string[][] = [];
  paragraphs: any[] = [];
  showTables: boolean = false;
  showParagraphs: boolean = true;

  constructor(
    private docmodelService: DocumentAnalysisService,
    private imageCompress: NgxImageCompressService
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFileInput(input.files[0]);
    }
  }

  handleFileInput(file: File): void {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      const imgBase64Path = reader.result as string;
      this.imageCompress
        .compressFile(imgBase64Path, -1, 50, 50)
        .then((result) => {
          this.imagePreview = result;
        });
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    } else if (typeof this.imagePreview === 'string') {
      const base64Data = this.imagePreview.split(',')[1];
      const blob = this.base64ToBlob(base64Data, 'image/jpeg');
      formData.append('file', blob, 'placeholder.jpg');
    }

    this.docmodelService.analyseDocument(formData).subscribe({
      next: (response) => {
        console.log(response.analyzeResult);
        this.extractedDocumenxt = response.analyzeResult.content;
        this.tables = Array.isArray(response.analyzeResult.tables)
          ? response.analyzeResult.tables
          : [];
        this.paragraphs = Array.isArray(response.analyzeResult.paragraphs)
          ? response.analyzeResult.paragraphs
          : [];
      },
      error: (err) => {
        console.error('Error uploading file', err);
      },
    });
  }

  base64ToBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  toggleTables(): void {
    this.showTables = true;
    this.showParagraphs = false;
  }

  toggleParagraphs(): void {
    this.showTables = false;
    this.showParagraphs = true;
  }

  getTableHeaders(table: any): any[] {
    return table.cells
      .filter((cell: any) => cell.rowIndex === 0)
      .sort((a: any, b: any) => a.columnIndex - b.columnIndex);
  }

  getTableRows(table: any): any[] {
    const rowIndices = Array.from(
      new Set(
        table.cells
          .map((cell: any) => cell.rowIndex)
          .filter((index: number) => index !== 0)
      )
    );
    return rowIndices;
  }

  getRowData(table: any, rowIndex: number): any[] {
    return table.cells
      .filter((cell: any) => cell.rowIndex === rowIndex)
      .sort((a: any, b: any) => a.columnIndex - b.columnIndex);
  }

  selectPlaceholder(placeholder: string): void {
    this.imagePreview = placeholder;
    this.selectedFile = null;
    this.convertPlaceholderToBase64(placeholder);
    this.imageSelected = true;
  }
  convertPlaceholderToBase64(imagePath: string): void {
    const img = new Image();
    img.src = imagePath;
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        this.imagePreview = canvas.toDataURL('image/jpeg');
      }
    };
  }

  onSaveTables(table: any[][]): void {
    if (this.tables.length > 0) {
      this.docmodelService.saveTables(table).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'tables.xlsx';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        },
        error: (error) => {
          console.error('Error saving table', error);
        },
      });
    }
  }

  onSaveText(): void {
    if (this.extractedDocumenxt) {
      this.docmodelService
        .saveExtractedText(this.extractedDocumenxt)
        .subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'extracted_text.docx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          },
          error: (error) => {
            console.error('Error saving text', error);
          },
        });
    }
  }
}
