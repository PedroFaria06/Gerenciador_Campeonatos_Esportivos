import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css']
})
export class CampeonatoComponent {
  campeonatos = [
    {
      nome: 'Campeonato Estadual',
      status: 'Em andamento',
      local: 'São Paulo',
      data: '17/11/24 - 17/12/24',
      timesVisiveis: false,
      times: [
        { nome: 'Time 1' },
        { nome: 'Time 2' },
        { nome: 'Time 3' },
        { nome: 'Time 4' },
        { nome: 'Time 5' },
        { nome: 'Time 6' },
        { nome: 'Time 7' },
        { nome: 'Time 8' },
        { nome: 'Time 9' },
        { nome: 'Time 10' },
        { nome: 'Time 11' },
        { nome: 'Time 12' }
      ]
    },
    {
      nome: 'Copa Regional',
      status: 'Não Iniciado',
      local: 'Rio de Janeiro',
      data: '20/12/24 - 20/01/25',
      timesVisiveis: false,
      times: [
        { nome: 'Time 13' },
        { nome: 'Time 14' },
        { nome: 'Time 15' },
        { nome: 'Time 16' }
      ]
    }
  ];

  novoCampeonato = {
    nome: '',
    dataInicio: '',
    dataTermino: '',
    local: ''
  };

  mostrarFormularioCadastro = false;
  mostrarFormularioInscricao = false;
  mostrarFormularioTime = false;

  campeonatoSelecionado: any = null;
  timeSelecionado: any = null;

  exibirFormularioCadastro() {
    this.mostrarFormularioCadastro = !this.mostrarFormularioCadastro;
  }

  fecharFormularioCadastro() {
    this.mostrarFormularioCadastro = false;
  }

  cadastrarCampeonato() {
    if (this.novoCampeonato.nome && this.novoCampeonato.dataInicio && this.novoCampeonato.dataTermino && this.novoCampeonato.local) {
      const data = `${this.novoCampeonato.dataInicio} - ${this.novoCampeonato.dataTermino}`;
      this.campeonatos.push({
        nome: this.novoCampeonato.nome,
        status: 'Não Iniciado',
        local: this.novoCampeonato.local,
        data: data,
        timesVisiveis: false,
        times: []
      });

      this.novoCampeonato = { nome: '', dataInicio: '', dataTermino: '', local: '' };
      this.mostrarFormularioCadastro = false;
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  toggleTimes(index: number) {
    this.campeonatos[index].timesVisiveis = !this.campeonatos[index].timesVisiveis;
  }

  excluirTime(campeonato: any, time: any) {
    const index = campeonato.times.indexOf(time);
    if (index !== -1) {
      campeonato.times.splice(index, 1);
    }
  }

  confirmarExclusao(campeonato: any, time: any) {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir o time ${time.nome}?`);
    if (confirmacao) {
      this.excluirTime(campeonato, time);
    }
  }

  exibirFormularioInscricao() {
    this.mostrarFormularioInscricao = true;
    this.mostrarFormularioTime = false;
    this.campeonatoSelecionado = null;
    this.timeSelecionado = null;
  }

  selecionarCampeonato() {
    if (this.campeonatoSelecionado) {
      this.mostrarFormularioInscricao = false;
      this.mostrarFormularioTime = true;
    } else {
      alert('Por favor, selecione um campeonato.');
    }
  }

  selecionarTime() {
    if (this.timeSelecionado) {
      alert(`Inscrição realizada com sucesso!\nCampeonato: ${this.campeonatoSelecionado.nome}\nTime: ${this.timeSelecionado.nome}`);
      this.fecharFormularioInscricao();
    } else {
      alert('Por favor, selecione um time.');
    }
  }

  fecharFormularioInscricao() {
    this.mostrarFormularioInscricao = false;
    this.mostrarFormularioTime = false;
    this.campeonatoSelecionado = null;
    this.timeSelecionado = null;
  }
  onCampeonatoChange() {
    this.timeSelecionado = null;
}
}