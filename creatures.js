import {Actor} from './actor.js';

creature_factory = {
    'GoblinRecruit': function(name = 'Goblin Recruit') { return new Actor(name, 10); },
    'GoblinSoldier': function(name = 'Goblin Soldier') { return new Actor(name, 20); },
    'GoblinShaman': function(name = 'Goblin Shaman') { return new Actor(name, 30); },
    'GoblinWizard': function(name = 'Goblin Wizard') { return new Actor(name, 40); },
    'GoblinWarrior': function(name = 'Goblin Warrior') { return new Actor(name, 50); },
    'GoblinBoss': function(name = 'Goblin Boss') { return new Actor(name, 160); },
    'GoblinKing': function(name = 'Goblin King') { return new Actor(name, 200); },
    'OrcWarrior': function(name = 'Orc Warrior') { return new Actor(name, 100); },
    'OrcShaman': function(name = 'Orc Shaman') { return new Actor(name, 125); },
    'OrcChampion': function(name = 'Orc Champion') { return new Actor(name, 175); },
    'OrcWarlock': function(name = 'Orc Warlock') { return new Actor(name, 200); },
    'OrcBoss': function(name = 'Orc Boss') { return new Actor(name, 350); },
};


export {creature_factory};
