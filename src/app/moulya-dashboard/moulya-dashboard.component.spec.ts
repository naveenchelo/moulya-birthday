import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoulyaDashboardComponent } from './moulya-dashboard.component';

describe('MoulyaDashboardComponent', () => {
  let component: MoulyaDashboardComponent;
  let fixture: ComponentFixture<MoulyaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoulyaDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoulyaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
