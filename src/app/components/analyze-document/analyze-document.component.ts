import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DocumentAnalysisService } from '../../services/document-analysis.service';

@Component({
  selector: 'app-analyze-document',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './analyze-document.component.html',
  styleUrl: './analyze-document.component.css'
})
export class AnalyzeDocumentComponent {
selectedFile: File | null = null;
  extractedDocumenxt: string | null = null;
  imagePreview: string | ArrayBuffer | null = 'peginv.jpg';
  tables: any[] = [];
  showTables: boolean = false;

  constructor(private docmodelService: DocumentAnalysisService) {}

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
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      this.docmodelService.analyseDocument(formData).subscribe({
        next: (response) => {
          console.log(response.analyzeResult);
          this.extractedDocumenxt = response.analyzeResult.content;
          this.tables = Array.isArray(response.analyzeResult.tables) ?  response.analyzeResult.tables : [];
        },
        error: (err) => {
          console.error('Error uploading file', err);
        }
      });
    }
  }

  toggleTables(): void {
    this.showTables = !this.showTables;
  }

  getTableHeaders(table: any): any[] {
    return table.cells.filter((cell: any) => cell.rowIndex === 0).sort((a: any, b: any) => a.columnIndex - b.columnIndex);
  }

  // getTableRows(table: any): any[] {
  //   return table.cells.filter((cell: any) => cell.rowIndex !== 0);
  // }

  getTableRows(table: any): any[] {
    const rowIndices = Array.from(new Set(table.cells.map((cell: any) => cell.rowIndex).filter((index: number) => index !== 0)));
    return rowIndices;
  }

  getRowData(table: any, rowIndex: number): any[] {
    return table.cells.filter((cell: any) => cell.rowIndex === rowIndex).sort((a: any, b: any) => a.columnIndex - b.columnIndex);
  }
}
