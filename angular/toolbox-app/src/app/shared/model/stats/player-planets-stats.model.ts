import {PlanetsBatch} from "./planets-batch.model";

export class PlayerPlanets {
  private _playerId: number;
  private _planets: PlanetsBatch[] = [];
  private _name: string;
  private _turn: number;
  private _total: number = 1;
  private _g1Total: number = 0;
  private _g213Total: number = 0;
  private _g1449Total: number = 0;

  get turn(): number {
    return this._turn;
  }

  set turn(value: number) {
    this._turn = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get playerId(): number {
    return this._playerId;
  }

  set playerId(value: number) {
    this._playerId = value;
  }

  get planets(): PlanetsBatch[] {
    return this._planets;
  }

  set planets(value: PlanetsBatch[]) {
    this._planets = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get g1Total(): number {
    return this._g1Total;
  }

  set g1Total(value: number) {
    this._g1Total = value;
  }

  get g213Total(): number {
    return this._g213Total;
  }

  set g213Total(value: number) {
    this._g213Total = value;
  }

  get g1449Total(): number {
    return this._g1449Total;
  }

  set g1449Total(value: number) {
    this._g1449Total = value;
  }

  toJSON(): any {
    return {
      playerId: this.playerId,
      planets: this.planets,
      name: this.name,
      turn: this.turn,
      total: this.total,
      g1Total: this.g1Total,
      g213Total: this.g213Total,
      g1449Total: this.g1449Total
    };
  }
}
