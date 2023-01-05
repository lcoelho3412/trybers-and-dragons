import Archetype, { Mage } from './Archetypes';
import Energy from './Energy';
import Fighter, { SimpleFighter } from './Fighter';
import Race, { Elf } from './Races';
import getRandomInt from './utils';

export default class Character implements Fighter {
  private _name: string;
  private _race: Race;
  private _archetype: Archetype;
  private _maxLifePoints: number;
  private _lifePoints: number;
  private _strength: number;
  private _defense: number;
  private _dexterity: number;
  private _energy: Energy;

  constructor(name: string, race?: Race, archetype?: Archetype) {
    this._name = name;
    this._dexterity = getRandomInt(1, 10);
    this._race = race || new Elf(this._name, this._dexterity);
    this._archetype = archetype || new Mage(this._name);
    this._maxLifePoints = this._race.maxLifePoints / 2;
    this._lifePoints = this._maxLifePoints;
    this._strength = getRandomInt(1, 10);
    this._defense = getRandomInt(1, 10);
    this._energy = {
      type_: this._archetype.energyType,
      amount: getRandomInt(1, 10),
    };
  }

  get race(): Race {
    return this._race;
  }

  get archetype(): Archetype {
    return this._archetype;
  }

  get lifePoints(): number {
    return this._lifePoints;
  }

  get maxLifePoints(): number {
    return this._maxLifePoints;
  }

  get strength(): number {
    return this._strength;
  }

  get defense(): number {
    return this._defense;
  }

  get dexterity(): number {
    return this._dexterity;
  }

  get energy(): Energy {
    return { ...this._energy };
  }

  private static randomValue(): number {
    return getRandomInt(1, 10);
  }

  private checkHP(): number | undefined {
    if (this.lifePoints <= 0) {
      this._lifePoints = -1;
      return this.lifePoints;
    }
  }

  public receiveDamage(attackPoints: number): number {
    this.checkHP();

    const damage = attackPoints - this.defense;
    this._lifePoints = damage > 0
      ? this.lifePoints - damage
      : this.lifePoints - 1;

    this.checkHP();
    return this.lifePoints;
  }

  public attack(enemy: Fighter | SimpleFighter): void {
    enemy.receiveDamage(this.strength);
  }

  public levelUp(): void {
    this._maxLifePoints += Character.randomValue();
    if (this.maxLifePoints > this.race.maxLifePoints) {
      this._maxLifePoints = this.race.maxLifePoints;
    }
    this._strength += Character.randomValue();
    this._dexterity += Character.randomValue();
    this._defense += Character.randomValue();
    this._energy.amount = 10;
    this._lifePoints = this.maxLifePoints;
  }

  special(enemy: Fighter): void {
    console.log(`${enemy} ${this._name}`);
  }
}