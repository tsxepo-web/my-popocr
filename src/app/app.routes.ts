import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ExtractTextComponent } from './components/extract-text/extract-text.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'home' },
    { path: 'extractText', component: ExtractTextComponent, title: 'extractText' },    
];
