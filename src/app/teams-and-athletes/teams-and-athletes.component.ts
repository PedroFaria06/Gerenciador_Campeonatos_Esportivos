import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-teams-and-athletes',
  imports: [CommonModule, FormsModule],
  templateUrl: './teams-and-athletes.component.html',
  styleUrl: './teams-and-athletes.component.css'
})
export class TeamsAndAthletesComponent {
  isModalOpen = false;
  modalTitle = '';
  isRemoveModalOpen = false;
  teamToRemove: any = null;


  newTeam = {
    name: '',
    coachName: '',
    playerCount: null,
  };

  charCount = {
    teamName: 0,
    coachName: 0,
    playerCount: 0
  };


  players: Array<{ number: number; name: string; position: string; height: string }> = [];

  teams = [
    { name: 'Time A' },
    { name: 'Time B' },
    { name: 'Time C' },
    { name: 'Time D' },
  ];

  athletes = [
    { number: 1, name: 'João da Silva', position: 'Goleiro', height: 1.95, teamName: 'Time A' },
    { number: 2, name: 'José Pereira', position: 'Zagueiro', height: 1.85, teamName: 'Time A' },

    { number: 3, name: 'Maria Oliveira', position: 'Atacante', height: 1.75, teamName: 'Time B' },
    { number: 4, name: 'Ana Souza', position: 'Meio-campista', height: 1.70, teamName: 'Time B' },
    { number: 5, name: 'Pedro Santos', position: 'Lateral', height: 1.80, teamName: 'Time C' },
    { number: 6, name: 'Paulo Pereira', position: 'Zagueiro', height: 1.85, teamName: 'Time C' },
    { number: 7, name: 'Marta Silva', position: 'Atacante', height: 1.75, teamName: 'Time D' },
    { number: 8, name: 'Carla Oliveira', position: 'Meio-campista', height: 1.70, teamName: 'Time D' },
    { number: 9, name: 'Ricardo Souza', position: 'Lateral', height: 1.80, teamName: 'Time A' },
    { number: 10, name: 'Fernanda Santos', position: 'Goleiro', height: 1.95, teamName: 'Time B' },
    { number: 1, name: 'João da Silva', position: 'Goleiro', height: 1.95, teamName: 'Time A' },
    { number: 2, name: 'José Pereira', position: 'Zagueiro', height: 1.85, teamName: 'Time A' },

    { number: 3, name: 'Maria Oliveira', position: 'Atacante', height: 1.75, teamName: 'Time B' },
    { number: 4, name: 'Ana Souza', position: 'Meio-campista', height: 1.70, teamName: 'Time B' },
    { number: 5, name: 'Pedro Santos', position: 'Lateral', height: 1.80, teamName: 'Time C' },
    { number: 6, name: 'Paulo Pereira', position: 'Zagueiro', height: 1.85, teamName: 'Time C' },
    { number: 7, name: 'Marta Silva', position: 'Atacante', height: 1.75, teamName: 'Time D' },
    { number: 8, name: 'Carla Oliveira', position: 'Meio-campista', height: 1.70, teamName: 'Time D' },
    { number: 9, name: 'Ricardo Souza', position: 'Lateral', height: 1.80, teamName: 'Time A' },
    { number: 10, name: 'Fernanda Santos', position: 'Goleiro', height: 1.95, teamName: 'Time B' },
    { number: 1, name: 'João da Silva', position: 'Goleiro', height: 1.95, teamName: 'Time A' },
    { number: 2, name: 'José Pereira', position: 'Zagueiro', height: 1.85, teamName: 'Time A' },

    { number: 3, name: 'Maria Oliveira', position: 'Atacante', height: 1.75, teamName: 'Time B' },
    { number: 4, name: 'Ana Souza', position: 'Meio-campista', height: 1.70, teamName: 'Time B' },
    { number: 5, name: 'Pedro Santos', position: 'Lateral', height: 1.80, teamName: 'Time C' },
    { number: 6, name: 'Paulo Pereira', position: 'Zagueiro', height: 1.85, teamName: 'Time C' },
    { number: 7, name: 'Marta Silva', position: 'Atacante', height: 1.75, teamName: 'Time D' },
    { number: 8, name: 'Carla Oliveira', position: 'Meio-campista', height: 1.70, teamName: 'Time D' },
    { number: 9, name: 'Ricardo Souza', position: 'Lateral', height: 1.80, teamName: 'Time A' },
    { number: 10, name: 'Fernanda Santos', position: 'Goleiro', height: 1.95, teamName: 'Time B' },
  ];

  openModal(title: string): void {
    this.isModalOpen = true;
    this.modalTitle = title;
  }

  closeModal() {
    this.isModalOpen = false;
    this.resetForm();
  }

  openRemoveModal(team: any): void {
    this.teamToRemove = team;
    this.isRemoveModalOpen = true;
  }

  closeRemoveModal(): void {
    this.isRemoveModalOpen = false;
    this.teamToRemove = null;
  }

  teamsWithAthletes = this.teams.map(team => {
    return {
      ...team,
      athletes: this.athletes.filter(athlete => athlete.teamName === team.name),
      isExpanded: false
    };
  });


  toggleOptionsMenu(event: Event): void {
    const menu = (event.target as HTMLElement).nextElementSibling;
    if (menu) {
      menu.classList.toggle('hidden');
      menu.classList.toggle('visible');
    }
  }


  toggleExpand(team: any) {
    team.isExpanded = !team.isExpanded;
  }

  saveTeam() {
    console.log('Team saved:', this.newTeam);
    this.closeModal();
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

  resetForm() {
    this.newTeam = { name: '', coachName: '', playerCount: null };
    this.players = [];
  }

  confirmRemove(): void {
    if (this.teamToRemove) {
      
      console.log('Removendo time:', this.teamToRemove);
    }
    this.closeRemoveModal();
  }
}
