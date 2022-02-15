import {roll} from './dice.js';
import {Armor} from './armor.js';
import {Weapon} from './weapon.js';
import {Actor} from './actor.js';
import {config} from './config.js';

function attacks(source, target) {
    let result = null;

    if (source.roll_accuracy > target.roll_defense) {
        result = `${source.name} hits ${target.name} for ${source.roll_damage} damage`;
        target.health_current -= source.roll_damage;
    } else if (source.roll_accuracy == target.roll_defense) {
        const glancing_damage = Math.floor(source.roll_damage / 2);
        result = `${source.name} glances ${target.name} for ${glancing_damage} damage`;
        target.health_current -= glancing_damage;
    } else{
        result = `${source.name} misses ${target.name}`;
    }

    // console.log(result);
}

function simulate_battle() {
    let winner = null;
    let result = null;
    let round = 0;
    // const mode = 'bobvsjim';
    // const mode = 'bobvsimp';
    const mode = 'bobvsimps';

    const bob = new Actor("Bob", 75);
    // bob.armor = new Armor("Nude", "nude", 2);
    // bob.armor = new Armor("Cloth", "cloth", 4);
    // bob.armor = new Armor("Leather", "leather", 6);
    // bob.armor = new Armor("Chain", "chain", 8);
    // bob.armor = new Armor("Plate", "plate", 10);

    // bob.weapon = new Weapon("Dagger", "dagger", 4, 4, 4);   // this is the default weapon
    // bob.weapon = new Weapon("Balanced Dagger", "dagger", 6, 4, 4);
    // bob.weapon = new Weapon("Poisoned Dagger", "dagger", 4, 6, 4);
    bob.weapon = new Weapon("Short Sword", "sword", 4, 4, 6);


    const jim = new Actor("Jim", 50);
    // jim.weapon = new Weapon("Dagger", "dagger", 4, 4, 4);  // this is the default weapon
    // jim.weapon = new Weapon("Balanced Dagger", "dagger", 6, 4, 4);
    // jim.weapon = new Weapon("Poisoned Dagger", "dagger", 4, 6, 4);

    const impA = new Actor("imp A", 20);
    // impA.weapon = new Weapon("Dagger", "dagger", 4, 4, 4);  // this is the default weapon
    // impA.weapon = new Weapon("Balanced Dagger", "dagger", 6, 4, 4);
    // impA.weapon = new Weapon("Poisoned Dagger", "dagger", 4, 6, 4);

    const impB = new Actor("imp B", 20);
    // impB.weapon = new Weapon("Dagger", "dagger", 4, 4, 4);  // this is the default weapon
    // impB.weapon = new Weapon("Balanced Dagger", "dagger", 6, 4, 4);
    // impB.weapon = new Weapon("Poisoned Dagger", "dagger", 4, 6, 4);

    if (mode == 'bobvsimp') {

        while (impA.alive() && bob.alive()) {
            round++;

            impA.rolls();
            bob.rolls();

            attacks(impA, bob);
            attacks(bob, impA);
        }

        if(bob.alive()) {
            result = `${bob.name} wins!`;
            winner =  1;
        } else {
            result = `${bob.name} loses!`;
            winner = -1;
        }

        result += ` Battle took ${round} rounds`;

        if(config.debug_level >= 1) console.log(result);

        return winner;

    }


    if(mode == 'bobvsimps') {
        while( (impA.alive() || impB.alive()) && bob.alive()) {
            round++;

            if(impA.alive()) {
                impA.rolls();
                impB.rolls();
                bob.rolls();

                attacks(impA, bob);
                attacks(impB, bob);
                attacks(bob, impA);

            } else {
                if(impB.alive()) {
                    impB.rolls();
                    bob.rolls();
                    attacks(impB, bob);
                    attacks(bob, impB);
                }
            }
        }

        if(bob.alive()) {
            result = `${bob.name} wins!`;
            winner =  1;
        } else {
            result = `${bob.name} loses!`;
            winner = -1;
        }

        result += ` Battle took ${round} rounds`;

        if(config.debug_level >= 1) console.log(result);

        return winner;

    }

    if(mode == 'bobvsjim') {

        while(bob.alive() && jim.alive()) {
            round++;

            bob.rolls();
            jim.rolls();

            attacks(bob, jim);
            attacks(jim, bob);
        }

        if(bob.alive()) {
            result = `${bob.name} wins!`;
            winner =  1;
        }

        if(jim.alive()) {
            result = `${jim.name} wins!`;
            winner =  -1;
        }

        if(!bob.alive() && !jim.alive()) {
            result = "It's a tie!";
            winner =  0;
        }

        result += ` Battle took ${round} rounds`;

        if(config.debug_level >= 1) console.log(result);

        return winner;
    }
}

let ties = 0, jim = 0, bob = 0;
for(let i = 0; i < 1000; i++) {
    const result = simulate_battle();
    if(result == 0) {
        ties++;
    } else if(result == 1) {
        bob++;
    } else {
        jim++;
    }
}

console.log(`Bob's wins:   ${bob}`);
console.log(`Bob's losses: ${jim}`);
console.log(`Ties:         ${ties}`);

