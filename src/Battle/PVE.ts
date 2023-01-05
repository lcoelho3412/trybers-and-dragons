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

  private playerAttackMonsters() {
    const { monsters } = this;
    const monstersAlive = monsters.filter(({ lifePoints }) => lifePoints > 0);
    this._playerOne.attack(monstersAlive[0]);
  }

  private monstersAttackPlayer() {
    const { playerOne, monsters } = this;
    monsters.forEach((monster) => {
      if (playerOne.lifePoints > 0) {
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