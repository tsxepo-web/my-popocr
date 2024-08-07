import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExtractTextComponent } from './components/extract-text/extract-text.component';
import { AnalyzeDocumentComponent } from './components/analyze-document/analyze-document.component';
import { AnalyzeReceiptComponent } from './components/analyze-receipt/analyze-receipt.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'home' },
    { path: 'extractText', component: ExtractTextComponent, title: 'extractText' },  
    { path: 'analyzeDocument', component: AnalyzeDocumentComponent, title: 'analyzeDocument' },
    { path: 'analyzeReceipt', component: AnalyzeReceiptComponent, title: 'analyzeReceipt' }
  
];
