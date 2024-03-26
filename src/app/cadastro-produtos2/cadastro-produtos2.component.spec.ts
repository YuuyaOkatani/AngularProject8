import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProdutos2Component } from './cadastro-produtos2.component';

describe('CadastroProdutos2Component', () => {
  let component: CadastroProdutos2Component;
  let fixture: ComponentFixture<CadastroProdutos2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroProdutos2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CadastroProdutos2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
