function roll(sides, modifier = 0) {

    if (typeof sides === 'number') {
        return Math.floor(Math.random() * sides) + 1 + modifier;
    }

    if (typeof sides === 'object') {
        let total_roll = 0;
        for (let i = 0; i < sides.length; i++) {
            total_roll += Math.floor(Math.random() * sides[i]) + 1 ;
        }
        total_roll += modifier;
        return total_roll;
    }

    console.log("Unhandled type:");
    console.log(typeof sides);
    return false;
}

export {roll};