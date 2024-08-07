import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzeReceiptComponent } from './analyze-receipt.component';

describe('AnalyzeReceiptComponent', () => {
  let component: AnalyzeReceiptComponent;
  let fixture: ComponentFixture<AnalyzeReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyzeReceiptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyzeReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
