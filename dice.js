function roll(sides, modifier = 0) {

    // check if sides is simply a number to perform a standard dX+modifier roll
    if (typeof sides === 'number') {
        return Math.floor(Math.random() * sides) + 1 + modifier;
    }

    // check if sides is an array to perform a [YdX]+...+modifier roll with a weighted die
    if (typeof sides === 'object') {
        // start our total roll at 0
        let total_roll = 0;

        // perform the roll for each die in the array
        for (let i = 0; i < sides.length; i++) {
            total_roll += Math.floor(Math.random() * sides[i]) + 1 ;
        }

        // finally, add the modifier to the total roll
        total_roll += modifier;

        // return the total roll
        return total_roll;
    }

    // if sides is neither a number nor an array, return false
    console.log("Unhandled type:");
    console.log(typeof sides);
    return false;
}

export {roll};