import {roll} from './dice.js';
import {Armor} from './armor.js';
import {Weapon} from './weapon.js';


class Actor {
    constructor(name, health) {
        this.name = name;
        this.weapon = new Weapon();
        this.offhand = null;
        this.armor = new Armor();
        this.health_max = health;
        this.health_current = health;
        this.roll_accuracy = 0;
        this.roll_defense = 0;
        this.roll_damage = 0;
    }

    alive() {
        return this.health_current > 0;
    }

    rolls() {
        this.roll_accuracy = roll(this.weapon.accuracy);
        this.roll_defense = roll(this.armor.defense);
        this.roll_damage = roll(this.weapon.damage) + this.weapon.base_damage;

        // console.log(`${this.name} rolled accuracy ${this.roll_accuracy}, defense ${this.roll_defense}, damage ${this.roll_damage}`);
    }
}

export {Actor};
