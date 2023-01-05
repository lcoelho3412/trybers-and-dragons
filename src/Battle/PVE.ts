import Fighter, { SimpleFighter } from '../Fighter';
import Battle from './Battle';

export default class PVE extends Battle {
  private _playerOne: Fighter;
  private _monsters: SimpleFighter[];

  constructor(playerOne: Fighter, monsters: SimpleFighter[]) {
    super(playerOne);
    this._playerOne = playerOne;
    this._monsters = monsters;
  }

  public get playerOne(): Fighter {
    return this._playerOne;
  }

  public get monsters(): SimpleFighter[] {
    return this._monsters;
  }

  private playerAttackMonsters(monstersAlive: SimpleFighter[]): void {
    this.playerOne.attack(monstersAlive[0]);
  }

  private monstersAttackPlayer(monstersAlive: SimpleFighter[]): void {
    monstersAlive.forEach((monster) => {
      if (this.playerOne.lifePoints > 0) {
        monster.attack(this._playerOne); 
      }
    });
  }

  public fight(): number {
    const { playerOne, monsters } = this;
    while (
      playerOne.lifePoints > 0
      && monsters.some(({ lifePoints }) => lifePoints > 0)
    ) {
      this.playerAttackMonsters();
      this.monstersAttackPlayer();
    }

    return super.fight();
  }
}