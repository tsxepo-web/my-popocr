import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeDocumentComponent } from './analyze-document.component';

describe('AnalyzeDocumentComponent', () => {
  let component: AnalyzeDocumentComponent;
  let fixture: ComponentFixture<AnalyzeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzeDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
