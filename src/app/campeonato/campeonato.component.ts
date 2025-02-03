import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CampeonatoService } from '../services/campeonato.service';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent implements OnInit {
  campeonatos: any[] = [];
  novoCampeonato = { 
    name: '', 
    startDate: '', 
    endDate: '', 
    season: '',
    status: 'ACTIVE' // Status padrão alterado para "Em andamento"
  };
  mostrarFormularioCadastro = false;

  constructor(private campeonatoService: CampeonatoService) {}

  ngOnInit() {
    this.carregarCampeonatos();
  }

  carregarCampeonatos() {
    this.campeonatoService.getCampeonatos().subscribe(data => {
      this.campeonatos = data.content || [];
    });
  }

  exibirFormularioCadastro() {
    this.mostrarFormularioCadastro = true;
  }

  fecharFormularioCadastro() {
    this.mostrarFormularioCadastro = false;
  }

  cadastrarCampeonato() {
    // Validação básica
    if (!this.novoCampeonato.startDate || !this.novoCampeonato.endDate) {
      alert('Preencha as datas corretamente!');
      return;
    }

    if (new Date(this.novoCampeonato.endDate) < new Date(this.novoCampeonato.startDate)) {
      alert('A data de término deve ser posterior à data de início!');
      return;
    }

    const payload = {
      ...this.novoCampeonato,
      startDate: this.novoCampeonato.startDate,
      endDate: this.novoCampeonato.endDate,
      season: Number(this.novoCampeonato.season)
    };

    console.log('Enviando campeonato:', payload);

    this.campeonatoService.addCampeonato(payload).subscribe(
      (response) => {
        console.log('Cadastro realizado com sucesso:', response);
        this.carregarCampeonatos();
        this.novoCampeonato = { 
          name: '', 
          startDate: '', 
          endDate: '', 
          season: '',
          status: 'ACTIVE' // Mantém o padrão como "Em andamento"
        };
        this.mostrarFormularioCadastro = false;
      },
      (error) => {
        console.error('Erro completo:', error);
        alert('Erro ao cadastrar. Verifique os dados ou contate o suporte.');
      }
    );
  }
}