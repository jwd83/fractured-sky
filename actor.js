import {config} from './config.js';
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
        this.roll_oh_accuracy = 0;
        this.roll_oh_damage = 0;

    }

    alive() {
        return this.health_current > 0;
    }

    rolls() {
        this.roll_accuracy = roll(this.weapon.accuracy);
        this.roll_defense = roll(this.armor.defense);
        this.roll_damage = roll(this.weapon.damage) + this.weapon.base_damage;

        // check if offhand is a weapon
        if(this.offhand != null) {
            if(this.offhand.type !== 'shield') {
                // offhand gets -1 accuracy
                this.roll_oh_accuracy = roll(this.offhand.accuracy - 1);
                this.roll_oh_damage = roll(this.offhand.damage) + this.offhand.base_damage;
            }
        }

        // console.log(`${this.name} rolled accuracy ${this.roll_accuracy}, defense ${this.roll_defense}, damage ${this.roll_damage}`);
    }

    attack(target) {
        let result = '';

        if (this.roll_accuracy > target.roll_defense) {
            result += `${this.name} hits ${target.name} for ${this.roll_damage} damage`;
            target.health_current -= this.roll_damage;
        } else if (this.roll_accuracy == target.roll_defense) {
            const glancing_damage = Math.floor(this.roll_damage / 2);
            result += `${this.name} glances ${target.name} for ${glancing_damage} damage`;
            target.health_current -= glancing_damage;
        } else{
            result += `${this.name} misses ${target.name}`;
        }

        if(this.offhand != null) {
            if(this.offhand.type !== 'shield') {
                if (this.roll_oh_accuracy > target.roll_defense) {
                    result += `${this.name} off-hand hits ${target.name} for ${this.roll_oh_damage} damage`;
                    target.health_current -= this.roll_oh_damage;
                } else if (this.roll_oh_accuracy == target.roll_defense) {
                    const glancing_damage = Math.floor(this.roll_oh_damage / 2);
                    result += `${this.name} off-hand glances ${target.name} for ${glancing_damage} damage`;
                    target.health_current -= glancing_damage;
                } else{
                    result += `${this.name} off-hand misses ${target.name}`;
                }
            }
        }

        if(config.debug_level >= 1)  console.log(result);
    }
}

export {Actor};
