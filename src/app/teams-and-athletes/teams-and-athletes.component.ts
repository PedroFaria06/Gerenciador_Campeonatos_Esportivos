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
  modalTitle = '';
  isRemoveModalOpen = false;
  teamToRemove: Team | null = null;
  teams: Team[] = [];
  athletes: Player[] = [];
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

  teamsWithAthletes: any[] = [];

  constructor(
    private teamService: TeamService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.loadTeams();
  }
  loadTeams() {
    this.teamService.getTeams().subscribe(
      (response) => {
        console.log('Teams response:', response);
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
        console.log('Players response:', response);
        this.athletes = response.content || [];
        this.updateTeamsWithAthletes();
      },
      (error) => {
        console.error('Erro ao carregar jogadores:', error);
        this.athletes = [];
      }
    );
  }

  updateTeamsWithAthletes() {
    if (this.teams && Array.isArray(this.teams)) {
      this.teamsWithAthletes = this.teams.map((team) => {
        return {
          ...team,
          athletes: this.athletes.filter(
            (athlete) => athlete.teamId === team.id
          ),
          isExpanded: false,
        };
      });
    }
  }

  toggleOptionsMenu(event: Event): void {
    const menu = (event.target as HTMLElement).nextElementSibling;
    if (menu) {
      menu.classList.toggle('hidden');
      menu.classList.toggle('visible');
    }
  }

  generatePlayerFields() {
    const count = this.newTeam.playerCount || 0;
    this.players = Array.from({ length: count }, (_, i) => ({
      number: 0,
      name: '',
      position: '',
      height: '',
    }));
  }

  saveTeam() {
    if (!this.newTeam.name?.trim()) {
      alert('O nome do time é obrigatório');
      return;
    }
    if (!this.newTeam.city?.trim()) {
      alert('A cidade é obrigatória');
      return;
    }
    if (!this.newTeam.state?.trim()) {
      alert('O estado é obrigatório');
      return;
    }
    if (!this.newTeam.foundationDate) {
      alert('A data de fundação é obrigatória');
      return;
    }

    const teamData: Team = {
      name: this.newTeam.name.trim(),
      city: this.newTeam.city.trim(),
      state: this.newTeam.state.trim(),
      foundationDate: this.newTeam.foundationDate,
    };

    console.log('Enviando time:', teamData);

    this.teamService.addTeam(teamData).subscribe({
      next: (response) => {
        console.log('Time salvo com sucesso:', response);
        this.loadTeams();
        this.closeModal();
      },
      error: (error) => {
        console.error('Erro ao salvar time:', error);
        if (error.error?.message) {
          alert(error.error.message);
        } else {
          alert('Erro ao salvar o time. Verifique os dados.');
        }
      },
    });
  }

  confirmRemove() {
    if (this.teamToRemove?.id) {
      this.teamService.deleteTeam(this.teamToRemove.id).subscribe(
        () => {
          this.loadTeams();
          this.closeRemoveModal();
        },
        (error) => {
          console.error('Erro ao remover time:', error);
        }
      );
    }
  }

  openModal(title: string): void {
    this.isModalOpen = true;
    this.modalTitle = title;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  openRemoveModal(team: Team): void {
    this.teamToRemove = team;
    this.isRemoveModalOpen = true;
  }

  closeRemoveModal(): void {
    this.isRemoveModalOpen = false;
    this.teamToRemove = null;
  }

  toggleExpand(team: any) {
    team.isExpanded = !team.isExpanded;
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
