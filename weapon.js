class Weapon {
    constructor (name = "Dagger", type="dagger", accuracy = 4, damage = 4, base_damage = 4) {
        this.name = name;
        this.type = type;
        this.accuracy = accuracy;
        this.damage = damage;
        this.base_damage = base_damage;
    }
}

export { Weapon };