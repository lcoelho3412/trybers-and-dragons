import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  private _playerOne: Fighter;
  private _playerTwo: Fighter;

  constructor(player01: Fighter, player02: Fighter) {
    super(player01);
    this._playerOne = player01;
    this._playerTwo = player02;
  }

  public get player01(): Fighter {
    return this._playerOne;
  }

  public get player02(): Fighter {
    return this._playerTwo;
  }

  public fight():number {
    while (
      this.player01.lifePoints > 0 && this.player02.lifePoints > 0
    ) {
      this._playerOne.attack(this._playerTwo);
      this._playerTwo.attack(this._playerOne);
    }

    return super.fight();
  }
}