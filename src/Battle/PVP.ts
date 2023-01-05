import Fighter from '../Fighter';
import Battle from './Battle';

export default class PVP extends Battle {
  private _playerOne: Fighter;
  private _playerTwo: Fighter;

  constructor(playerOne: Fighter, playerTwo: Fighter) {
    super(playerOne);
    this._playerOne = playerOne;
    this._playerTwo = playerTwo;
  }

  public get playerOne(): Fighter {
    return this._playerOne;
  }

  public get playerTwo(): Fighter {
    return this._playerTwo;
  }

  public fight():number {
    while (
      this.playerOne.lifePoints > 0 && this.playerTwo.lifePoints > 0
    ) {
      this._playerOne.attack(this._playerTwo);
      this._playerTwo.attack(this._playerOne);
    }

    return super.fight();
  }
}