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
<<<<<<< HEAD

  constructor(private campeonatoService: CampeonatoService) {}

  ngOnInit() {
    this.carregarCampeonatos();
  }

  carregarCampeonatos() {
    this.campeonatoService.getCampeonatos().subscribe(data => {
      this.campeonatos = data.content || [];
    });
  }

=======
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
>>>>>>> 72dbae68dc6d8eacd7e195a4c92b5bff037fad3f
  exibirFormularioCadastro() {
    this.mostrarFormularioCadastro = true;
  }
  fecharFormularioCadastro() {
    this.mostrarFormularioCadastro = false;
  }
  cadastrarCampeonato() {
<<<<<<< HEAD
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
=======
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
        this.mostrarNotificacao('Time removido com sucesso!', 'sucesso');
    }
  }
  confirmarExclusao(campeonato: any, time: any) {
    const confirmacao = window.confirm(
        `Ao remover a inscrição do time ${time.nome}, será necessário realizá-la novamente para participar do campeonato. Deseja remover mesmo assim?`
    );
    
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
>>>>>>> 72dbae68dc6d8eacd7e195a4c92b5bff037fad3f
}