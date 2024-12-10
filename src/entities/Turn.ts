import Player from "./Player";

export default class Turn {
  private players: Player[];
  private currentTurnPlayer: Player;
  private turnPhase: 'draw' | 'play' | 'end';
  constructor() {
    this.players = [];
    this.turnPhase = 'draw';
  }

  getCurrentTurnPlayer() {
    return this.currentTurnPlayer;
  }

  setCurrentTurnPlayer(player: Player) {
    this.currentTurnPlayer = player;
  }

  changeTurn() {
    const currentPlayerIndex = this.players.indexOf(this.currentTurnPlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
    this.currentTurnPlayer = this.players[nextPlayerIndex];
  }

  setPlayers(players: Player[]) {
    this.players = players;
  }

  getPlayers() {
    return this.players;
  }

  getTurnPhase() {
    return this.turnPhase;
  }

  setTurnPhase(phase: 'draw' | 'play' | 'end') {
    this.turnPhase = phase;
  }
}