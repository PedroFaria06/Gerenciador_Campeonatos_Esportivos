import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChampionshipService } from '../services/championship.service';
import { Championship } from '../models/championship.interface';
import { Notification } from '../models/notification.interface';
import { PageResponse } from '../models/page-response.interface';
import { TeamService } from '../services/team.service';
import { Team } from '../models/team.interface';

@Component({
  selector: 'app-campeonato',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './campeonato.component.html',
  styleUrls: ['./campeonato.component.css'],
})
export class CampeonatoComponent implements OnInit {
  campeonatos: Championship[] = [];
  statusOptions: { codigo: string; descricao: string }[] = [];
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  novoCampeonato: Championship = {
    name: '',
    startDate: '',
    endDate: '',
    season: '',
    status: 'DRAFT',
  };

  mostrarFormularioCadastro = false;
  mostrarFormularioTimes = false;
  campeonatoSelecionado: Championship | null = null;
  timesDisponiveis: Team[] = [];
  timesSelecionados: number[] = [];

  notificacao: Notification = {
    mensagem: '',
    tipo: 'sucesso',
    mostrar: false,
  };

  constructor(
    private championshipService: ChampionshipService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.carregarCampeonatos();
    this.carregarStatusOptions();
  }

  carregarCampeonatos() {
    this.championshipService
      .getChampionships(this.currentPage, this.pageSize)
      .subscribe({
        next: (response: PageResponse<Championship>) => {
          this.campeonatos = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
        },
        error: (error) => {
          console.error('Erro ao carregar campeonatos:', error);
          this.mostrarNotificacao('Erro ao carregar campeonatos', 'erro');
        },
      });
  }

  carregarStatusOptions() {
    this.championshipService.getStatus().subscribe({
      next: (status) => {
        this.statusOptions = status;
      },
      error: (error) => {
        console.error('Erro ao carregar status:', error);
      },
    });
  }

  exibirFormularioCadastro() {
    this.mostrarFormularioCadastro = true;
  }

  fecharFormularioCadastro() {
    this.mostrarFormularioCadastro = false;
    this.resetForm();
  }

  abrirModalTimes(campeonato: Championship) {
    this.campeonatoSelecionado = campeonato;
    this.mostrarFormularioTimes = true;
    this.carregarTimes();
  }

  fecharModalTimes() {
    this.mostrarFormularioTimes = false;
    this.timesSelecionados = [];
    this.campeonatoSelecionado = null;
  }

  carregarTimes() {
    this.teamService.getTeams().subscribe({
      next: (response) => {
        this.timesDisponiveis = response.content;
      },
      error: (error) => {
        console.error('Erro ao carregar times:', error);
        this.mostrarNotificacao('Erro ao carregar times', 'erro');
      },
    });
  }

  toggleTime(timeId: number) {
    const index = this.timesSelecionados.indexOf(timeId);
    if (index === -1) {
      this.timesSelecionados.push(timeId);
    } else {
      this.timesSelecionados.splice(index, 1);
    }
  }

  salvarTimes() {
    if (!this.campeonatoSelecionado || !this.timesSelecionados.length) {
      this.mostrarNotificacao('Selecione pelo menos um time', 'erro');
      return;
    }

    this.championshipService
      .addTeamsToChampionship(
        this.campeonatoSelecionado.id!,
        this.timesSelecionados
      )
      .subscribe({
        next: () => {
          this.mostrarNotificacao('Times adicionados com sucesso!', 'sucesso');
          this.fecharModalTimes();
        },
        error: (error) => {
          console.error('Erro ao adicionar times:', error);
          this.mostrarNotificacao(
            'Erro ao adicionar times ao campeonato',
            'erro'
          );
        },
      });
  }

  cadastrarCampeonato() {
    if (!this.validarCampeonato()) {
      return;
    }

    const payload: Championship = {
      ...this.novoCampeonato,
      startDate: new Date(this.novoCampeonato.startDate)
        .toISOString()
        .split('T')[0],
      endDate: new Date(this.novoCampeonato.endDate)
        .toISOString()
        .split('T')[0],
      status: 'DRAFT',
    };

    this.championshipService.addChampionship(payload).subscribe({
      next: (response) => {
        this.mostrarNotificacao(
          'Campeonato cadastrado com sucesso!',
          'sucesso'
        );
        this.carregarCampeonatos();
        this.resetForm();
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
        this.mostrarNotificacao('Erro ao cadastrar campeonato', 'erro');
      },
    });
  }

  validarCampeonato(): boolean {
    if (!this.novoCampeonato.name?.trim()) {
      this.mostrarNotificacao('O nome do campeonato é obrigatório!', 'erro');
      return false;
    }

    if (!this.novoCampeonato.startDate || !this.novoCampeonato.endDate) {
      this.mostrarNotificacao('Preencha as datas corretamente!', 'erro');
      return false;
    }

    const startDate = new Date(this.novoCampeonato.startDate);
    const endDate = new Date(this.novoCampeonato.endDate);

    if (endDate < startDate) {
      this.mostrarNotificacao(
        'A data de término deve ser posterior à data de início!',
        'erro'
      );
      return false;
    }

    if (!this.novoCampeonato.season?.trim()) {
      this.mostrarNotificacao('A temporada é obrigatória!', 'erro');
      return false;
    }

    return true;
  }

  getStatusClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      DRAFT: 'não-iniciado',
      IN_PROGRESS: 'em-andamento',
      FINISHED: 'concluido',
      CANCELLED: 'cancelled',
    };
    return statusMap[status] || '';
  }

  getStatusDescription(status: string): string {
    const statusMap: { [key: string]: string } = {
      DRAFT: 'Não Iniciado',
      IN_PROGRESS: 'Em Andamento',
      FINISHED: 'Concluído',
      CANCELLED: 'Cancelado',
    };
    return statusMap[status] || status;
  }

  confirmarExclusao(campeonato: Championship) {
    if (confirm(`Deseja realmente excluir o campeonato ${campeonato.name}?`)) {
      this.championshipService.deleteChampionship(campeonato.id!).subscribe({
        next: () => {
          this.mostrarNotificacao(
            'Campeonato excluído com sucesso!',
            'sucesso'
          );
          this.carregarCampeonatos();
        },
        error: (error) => {
          console.error('Erro ao excluir:', error);
          this.mostrarNotificacao('Erro ao excluir campeonato', 'erro');
        },
      });
    }
  }

  mostrarNotificacao(mensagem: string, tipo: 'sucesso' | 'erro') {
    this.notificacao = { mensagem, tipo, mostrar: true };
    setTimeout(() => this.fecharNotificacao(), 3000);
  }

  fecharNotificacao() {
    this.notificacao.mostrar = false;
  }

  resetForm() {
    this.novoCampeonato = {
      name: '',
      startDate: '',
      endDate: '',
      season: '',
      status: 'DRAFT',
    };
    this.mostrarFormularioCadastro = false;
  }

  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.carregarCampeonatos();
    }
  }
}
