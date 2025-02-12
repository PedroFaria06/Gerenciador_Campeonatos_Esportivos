import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { PlayerService } from '../services/player.service';
import { Team } from '../models/team.interface';
import { Player } from '../models/player.interface';
import { TeamForm } from '../models/team-form.interface';

@Component({
  selector: 'app-teams-and-athletes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './teams-and-athletes.component.html',
  styleUrl: './teams-and-athletes.component.css',
})
export class TeamsAndAthletesComponent implements OnInit {
  isModalOpen = false;
  isPlayerModalOpen = false;
  modalTitle = '';
  isRemoveModalOpen = false;
  teamToRemove: Team | null = null;
  selectedTeam: Team | null = null;
  teams: Team[] = [];
  athletes: Player[] = [];
  positions: any[] = [];
  players: Array<{
    number: number;
    name: string;
    position: string;
    height: string;
  }> = [];

  newTeam: TeamForm = {
    name: '',
    city: '',
    state: '',
    foundationDate: '',
    playerCount: null,
    coachName: '',
  };

  newPlayer: Player = {
    name: '',
    birthDate: '',
    position: '',
    shirtNumber: 0,
    teamId: 0,
  };

  teamsWithAthletes: any[] = [];

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.loadTeams();
    this.loadPositions();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe(
      (response) => {
        this.teams = response.content || [];
        this.loadAllPlayers();
      },
      (error) => {
        console.error('Erro ao carregar times:', error);
        this.teams = [];
      }
    );
  }

  loadAllPlayers() {
    this.playerService.getPlayers().subscribe(
      (response) => {
        this.athletes = response.content || [];
        this.updateTeamsWithAthletes();
      },
      (error) => {
        console.error('Erro ao carregar jogadores:', error);
        this.athletes = [];
      }
    );
  }

  loadPositions() {
    this.playerService.getPositions().subscribe({
      next: (positions) => {
        this.positions = positions;
      },
      error: (error) => {
        console.error('Erro ao carregar posições:', error);
      },
    });
  }

  updateTeamsWithAthletes() {
    if (this.teams && Array.isArray(this.teams)) {
      this.teamsWithAthletes = this.teams.map((team) => ({
        ...team,
        athletes: this.athletes.filter((athlete) => athlete.teamId === team.id),
        isExpanded: false,
      }));
    }
  }

  toggleOptionsMenu(event: Event): void {
    const button = event.target as HTMLElement;
    const menu = button.nextElementSibling as HTMLElement;
    const isCurrentlyVisible = menu.classList.contains('visible');

    const allMenus = document.querySelectorAll('.options-menu');
    allMenus.forEach((m) => {
      m.classList.remove('visible');
      m.classList.add('hidden');
    });

    if (!isCurrentlyVisible) {
      menu.classList.remove('hidden');
      menu.classList.add('visible');
    }

    event.stopPropagation();
  }

  toggleExpand(team: any): void {
    team.isExpanded = !team.isExpanded;

    this.teamsWithAthletes.forEach((t) => {
      if (t !== team) {
        t.isExpanded = false;
      }
    });
  }

  openModal(title: string, team?: Team): void {
    this.isModalOpen = true;
    this.modalTitle = title;

    if (team && title === 'Editar Time') {
      this.selectedTeam = team;
      this.newTeam = {
        name: team.name,
        city: team.city,
        state: team.state,
        foundationDate: team.foundationDate,
        playerCount: this.athletes.filter((a) => a.teamId === team.id).length,
        coachName: '',
      };
    }
  }

  openPlayerModal(team: Team): void {
    this.selectedTeam = team;
    this.isPlayerModalOpen = true;
    this.newPlayer = {
      name: '',
      birthDate: '',
      position: '',
      shirtNumber: 0,
      teamId: team.id!,
    };
  }

  savePlayer(): void {
    if (!this.selectedTeam || !this.validatePlayerForm()) return;

    const playerData = {
      ...this.newPlayer,
      birthDate: this.formatDate(this.newPlayer.birthDate),
    };

    this.playerService.addPlayer(playerData).subscribe({
      next: () => {
        this.loadAllPlayers();
        this.closePlayerModal();
      },
      error: (error) => {
        console.error('Erro ao salvar jogador:', error);
        alert('Erro ao salvar o jogador. Verifique os dados.');
      },
    });
  }

  validatePlayerForm(): boolean {
    if (!this.newPlayer.name?.trim()) {
      alert('O nome do jogador é obrigatório');
      return false;
    }
    if (!this.newPlayer.birthDate) {
      alert('A data de nascimento é obrigatória');
      return false;
    }
    if (!this.newPlayer.position) {
      alert('A posição é obrigatória');
      return false;
    }
    if (
      !this.newPlayer.shirtNumber ||
      this.newPlayer.shirtNumber < 1 ||
      this.newPlayer.shirtNumber > 99
    ) {
      alert('O número da camisa deve estar entre 1 e 99');
      return false;
    }
    return true;
  }

  saveTeam() {
    if (!this.validateTeamForm()) return;

    const teamData: Team = {
      name: this.newTeam.name.trim(),
      city: this.newTeam.city.trim(),
      state: this.newTeam.state.trim(),
      foundationDate: this.newTeam.foundationDate,
    };

    if (this.selectedTeam?.id) {
      this.teamService.updateTeam(this.selectedTeam.id, teamData).subscribe({
        next: () => {
          this.loadTeams();
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao atualizar time:', error);
          alert('Erro ao atualizar o time. Verifique os dados.');
        },
      });
    } else {
      this.teamService.addTeam(teamData).subscribe({
        next: () => {
          this.loadTeams();
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao salvar time:', error);
          alert('Erro ao salvar o time. Verifique os dados.');
        },
      });
    }
  }

  validateTeamForm(): boolean {
    if (!this.newTeam.name?.trim()) {
      alert('O nome do time é obrigatório');
      return false;
    }
    if (!this.newTeam.city?.trim()) {
      alert('A cidade é obrigatória');
      return false;
    }
    if (!this.newTeam.state?.trim()) {
      alert('O estado é obrigatório');
      return false;
    }
    if (!this.newTeam.foundationDate) {
      alert('A data de fundação é obrigatória');
      return false;
    }
    return true;
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      '0'
    )}-${String(d.getDate()).padStart(2, '0')}`;
  }

  openRemoveModal(team: Team): void {
    this.teamToRemove = team;
    this.isRemoveModalOpen = true;
  }

  closeRemoveModal(): void {
    this.isRemoveModalOpen = false;
    this.teamToRemove = null;
  }

  confirmRemove() {
    if (this.teamToRemove?.id) {
      this.teamService.deleteTeam(this.teamToRemove.id).subscribe({
        next: () => {
          this.loadTeams();
          this.closeRemoveModal();
        },
        error: (error) => {
          console.error('Erro ao remover time:', error);
          alert('Erro ao remover o time. Tente novamente.');
        },
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedTeam = null;
    this.resetForm();
  }

  closePlayerModal() {
    this.isPlayerModalOpen = false;
    this.selectedTeam = null;
    this.newPlayer = {
      name: '',
      birthDate: '',
      position: '',
      shirtNumber: 0,
      teamId: 0,
    };
  }

  resetForm() {
    this.newTeam = {
      name: '',
      city: '',
      state: '',
      foundationDate: '',
      playerCount: null,
      coachName: '',
    };
    this.players = [];
  }
}
