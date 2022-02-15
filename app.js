import {roll} from './dice.js';
import {Armor} from './armor.js';
import {Weapon} from './weapon.js';
import {Actor} from './actor.js';
import {config} from './config.js';

function simulate_battle() {
    let winner = null;
    let result = null;
    let round = 0;
    const mode = 'bobvsjim';
    // const mode = 'bobvsimp';
    // const mode = 'bobvsimps';

    const bob = new Actor("Bob", 500);

    // bob.armor = new Armor("Nude", "nude", 2);
    // bob.armor = new Armor("Cloth", "cloth", 4);                              // default armor
    // bob.armor = new Armor("Leather", "leather", 6);
    // bob.armor = new Armor("Chain", "chain", 8);
    // bob.armor = new Armor("Plate", "plate", 10);

    // bob.weapon = new Weapon("Dagger", "dagger", 4, 4, 4);                    // default weapon
    // bob.weapon = new Weapon("Balanced Dagger", "dagger", 6, 4, 4);
    // bob.weapon = new Weapon("Poisoned Dagger", "dagger", 4, 6, 4);
    // bob.weapon = new Weapon("Balanced Poisoned Dagger", "dagger", 6, 6, 4);
    // bob.weapon = new Weapon("Short Sword", "sword", 4, 4, 6);
    // bob.weapon = new Weapon("Rapier", "sword", 6, 4, 6);
    // bob.weapon = new Weapon("Estoc", "sword", 8, 6, 6);
    // bob.weapon = new Weapon("Muramasa", "sword", 10, 10, 10);
    bob.weapon = new Weapon("Masamune", "sword", 12, 12, 12);
    // bob.weapon = new Weapon("Iron Great Axe", "axe", 6, 8, 8);
    // bob.weapon = new Weapon("Odachi", "sword", 8, 4, 10);
    // bob.weapon = new Weapon("Zhweihander", "sword", 10, 10, 14);
    // bob.weapon = new Weapon("Goliath Great Hammer", "mace", 10, 12, 16);
    // bob.weapon = new Weapon("Crystal Greatsword", "sword", 12, 20, 20);

    // bob.offhand = new Weapon("Dagger", "dagger", 4, 4, 4);                    // default weapon
    // bob.offhand = new Weapon("Balanced Dagger", "dagger", 6, 4, 4);
    // bob.offhand = new Weapon("Poisoned Dagger", "dagger", 4, 6, 4);
    // bob.offhand = new Weapon("Balanced Poisoned Dagger", "dagger", 6, 6, 4);
    // bob.offhand = new Weapon("Short Sword", "sword", 4, 4, 6);
    // bob.offhand = new Weapon("Rapier", "sword", 6, 4, 6);
    // bob.offhand = new Weapon("Estoc", "sword", 8, 6, 6);
    bob.offhand = new Weapon("Muramasa", "sword", 10, 10, 10);
    // bob.offhand = new Weapon("Masamune", "sword", 12, 12, 12);


    const jim = new Actor("Jim", 500);

    // jim.armor = new Armor("Nude", "nude", 2);
    // jim.armor = new Armor("Cloth", "cloth", 4);                              // default armor
    // jim.armor = new Armor("Leather", "leather", 6);
    // jim.armor = new Armor("Chain", "chain", 8);
    // jim.armor = new Armor("Plate", "plate", 10);

    // jim.weapon = new Weapon("Dagger", "dagger", 4, 4, 4);   // default weapon
    // jim.weapon = new Weapon("Balanced Dagger", "dagger", 6, 4, 4);
    // jim.weapon = new Weapon("Poisoned Dagger", "dagger", 4, 6, 4);
    // jim.weapon = new Weapon("Balanced Poisoned Dagger", "dagger", 6, 6, 4);
    // jim.weapon = new Weapon("Short Sword", "sword", 4, 4, 6);
    // jim.weapon = new Weapon("Iron Great Axe", "axe", 6, 8, 8);
    // jim.weapon = new Weapon("Odachi", "sword", 8, 4, 10);
    // jim.weapon = new Weapon("Zhweihander", "sword", 10, 10, 14);
    // jim.weapon = new Weapon("Goliath Great Hammer", "mace", 10, 12, 16);
    jim.weapon = new Weapon("Crystal Greatsword", "sword", 12, 20, 20);

    // jim.offhand = new Weapon("Dagger", "dagger", 4, 4, 4);                    // default weapon
    // jim.offhand = new Weapon("Balanced Dagger", "dagger", 6, 4, 4);
    // jim.offhand = new Weapon("Poisoned Dagger", "dagger", 4, 6, 4);
    // jim.offhand = new Weapon("Balanced Poisoned Dagger", "dagger", 6, 6, 4);
    // jim.offhand = new Weapon("Short Sword", "sword", 4, 4, 6);

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

            impA.attack(bob);
            bob.attack(impA);
        }

        if(bob.alive()) {
            result = `${bob.name} wins!`;
            winner =  'bob';
        } else {
            result = `${bob.name} loses!`;
            winner = 'lone imp';
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

                impA.attack(bob);
                impB.attack(bob);
                bob.attack(impA);

            } else {
                impB.rolls();
                bob.rolls();

                impB.attack(bob);
                bob.attack(impB);

            }
        }

        if(bob.alive()) {
            result = `${bob.name} wins!`;
            winner =  'bob';
        } else {
            result = `${bob.name} loses!`;
            winner = 'imps';
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

            bob.attack(jim);
            jim.attack(bob);
        }

        if(bob.alive()) {
            result = `${bob.name} wins!`;
            winner =  bob.name;
        }

        if(jim.alive()) {
            result = `${jim.name} wins!`;
            winner =  jim.name;
        }

        if(!bob.alive() && !jim.alive()) {
            result = "It's a tie!";
            winner =  'tie';
        }

        result += ` Battle took ${round} rounds`;

        if(config.debug_level >= 1) console.log(result);

        return winner;
    }
}

let battle_results = {};

for(let i = 0; i < 10000; i++) {

    const result = simulate_battle();

    if (result in battle_results) {
        battle_results[result]++;
    } else {
        battle_results[result] = 1;
    }
}

for(let result in battle_results) {
    console.log(`${result}: ${battle_results[result]}`);
}
