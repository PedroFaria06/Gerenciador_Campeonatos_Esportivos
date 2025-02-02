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
  mostrarModalEditarTime = false;
  campeonatoEmEdicao: any = null;
  timeSelecionadoParaEdicao: any = null;
  novoNomeTime: string = '';
  notificacao = {
    mensagem: '',
    tipo: 'sucesso',
    mostrar: false
  };
  mostrarModalRemoverTime = false;
  timeSelecionadoParaRemocao: any = null;
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
        this.mostrarNotificacao('Cadastro realizado com sucesso!', 'sucesso');
    } else {
        this.mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
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
    this.campeonatoSelecionado = null;
    this.novoNomeTime = '';
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
    if (this.campeonatoSelecionado && this.novoNomeTime.trim()) {
        const novoTime = {
            nome: this.novoNomeTime.trim()
        };
        this.campeonatoSelecionado.times.push(novoTime);
        this.mostrarNotificacao('Inscrição salva com sucesso!', 'sucesso');
        this.fecharFormularioInscricao();
    } else {
        this.mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
    }
}

  fecharFormularioInscricao() {
    this.mostrarFormularioInscricao = false;
    this.campeonatoSelecionado = null;
    this.novoNomeTime = '';
  }
  onCampeonatoChange() {
    this.timeSelecionado = null;
  }
  atualizarStatus(campeonato: any, novoStatus: string) {
    campeonato.status = novoStatus;
  }
  abrirModalEditarTime(campeonato: any) {
    this.campeonatoEmEdicao = campeonato;
    this.mostrarModalEditarTime = true;
    this.timeSelecionadoParaEdicao = null;
    this.novoNomeTime = '';
  }

  fecharModalEditarTime() {
    this.mostrarModalEditarTime = false;
    this.campeonatoEmEdicao = null;
    this.timeSelecionadoParaEdicao = null;
    this.novoNomeTime = '';
  }
  salvarEdicaoTime() {
    if (this.timeSelecionadoParaEdicao && this.novoNomeTime.trim()) {
        this.timeSelecionadoParaEdicao.nome = this.novoNomeTime.trim();
        this.fecharModalEditarTime();
        this.mostrarNotificacao('Time editado com sucesso!', 'sucesso');
    } else {
        this.mostrarNotificacao('Por favor, preencha todos os campos.', 'erro');
    }
  }
  abrirModalRemoverTime(campeonato: any) {
    this.campeonatoEmEdicao = campeonato;
    this.mostrarModalRemoverTime = true;
    this.timeSelecionadoParaRemocao = null;
  }
  fecharModalRemoverTime() {
    this.mostrarModalRemoverTime = false;
    this.campeonatoEmEdicao = null;
    this.timeSelecionadoParaRemocao = null;
  }
  confirmarRemocaoTime() {
    if (this.timeSelecionadoParaRemocao) {
        const confirmacao = window.confirm(
            `Ao remover a inscrição do time ${this.timeSelecionadoParaRemocao.nome}, será necessário realizá-la novamente para participar do campeonato. Deseja remover mesmo assim?`
        );
        
        if (confirmacao) {
            const index = this.campeonatoEmEdicao.times.indexOf(this.timeSelecionadoParaRemocao);
            if (index !== -1) {
                this.campeonatoEmEdicao.times.splice(index, 1);
                this.fecharModalRemoverTime();
                this.mostrarNotificacao('Time removido com sucesso!', 'sucesso');
            }
        }
    } else {
        this.mostrarNotificacao('Por favor, selecione um time para remover.', 'erro');
    }
  }
  mostrarNotificacao(mensagem: string, tipo: 'sucesso' | 'erro') {
    this.notificacao = {
        mensagem,
        tipo,
        mostrar: true
    };
    setTimeout(() => {
        this.fecharNotificacao();
    }, 3000);
  }

  fecharNotificacao() {
    this.notificacao.mostrar = false;
  }
}