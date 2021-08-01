const default_game_info = require('./game_info.json');

class Game {
    constructor() {
        this.player_one = ""
        this.player_two = ""
        this.turn = ""
        this.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];
        this.game_info = {
            boardSize: 8,
            
        }
        this.player_one_game_info = {
            numShips: 3,
            shipsSunk: 0,
            ships: [
                {
                    name: "Destroyer",
                    locations: [0,0],
                    hits: [false, false],
                    sunk: false
                },
                {
                    name: "Cruiser",
                    locations: [0,0,0],
                    hits: [false, false, false],
                    sunk: false
                },
                {
                    name: "Battleship",
                    locations: [0,0,0,0],
                    hits: [false, false, false, false],
                    sunk: false
                },
            ],
            board: `00000000
                00000000
                00000000
                00000000
                00000000
                00000000
                00000000
                00000000`
            
        }
        this.player_two_game_info = {
            numShips: 3,
            shipsSunk: 0,
            ships: [
                {
                    name: "Destroyer",
                    locations: [0,0],
                    hits: [false, false],
                    sunk: false
                },
                {
                    name: "Cruiser",
                    locations: [0,0,0],
                    hits: [false, false, false],
                    sunk: false
                },
                {
                    name: "Battleship",
                    locations: [0,0,0,0],
                    hits: [false, false, false, false],
                    sunk: false
                },
            ],
            board: `00000000
                00000000
                00000000
                00000000
                00000000
                00000000
                00000000
                00000000`
            
        }
    }
    set_player_one(player_one) {
        this.player_one = player_one
        console.log(`Set player 1 to ${this.player_one}`);
    }
    set_player_two(player_two) {
        this.player_two = player_two
        console.log(`Set player 2 to ${this.player_two}`);
    }
    start_game() {
        this.generate_ship_locations(this.player_one_game_info)
        this.generate_ship_locations(this.player_two_game_info)
        this.set_turn(this.player_two)
    }
    set_turn(player) {
        this.turn = player
    }
    generate_ship_locations(player) {
        let locations;
        for (let i = 0; i < player.numShips; i++) {
            do {
                locations = this.generate_ship(player.ships[i].locations.length)
            } while (this.collision(locations, player));
            console.log(`setting ${player.ships[i].name} location to: ${locations}`);
            player.ships[i].locations = locations
        }
    }
    generate_ship(shipLength) {
        let direction = Math.floor(Math.random() * 2);
        let row, col;

        if (direction === 1) {
            row = Math.floor(Math.random() * this.game_info.boardSize)
            col = Math.floor(Math.random() * (this.game_info.boardSize - shipLength + 1))
        } else {
            row = Math.floor(Math.random() * (this.game_info.boardSize - shipLength + 1))
            col = Math.floor(Math.random() * this.game_info.boardSize)
        }

        console.log(`row: ${row}`);
        console.log(`column: ${col}`);

        let newShipLocations = [];

        for (let i = 0; i < shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
    }

    collision(locations, player) {
        for (let ship of player.ships) {
            for (let i = 0; i < locations.length; i++) {
                if (ship.locations.indexOf(locations[i]) >= 0) {
                    console.log("collsion");
                    return true
                }
            }
        }
        console.log("no collsion");
        return false
    }
    fire(row, col) {
        let shipHit = false;
        let rowAsNum = this.alphabet.indexOf(row.toUpperCase()) 
        let guess = rowAsNum + col
        if (this.turn === this.player_one) {
            shipHit = this.checkHit(this.player_two_game_info, guess)
            this.turn = this.player_two
            console.log(this.player_two_game_info);
        } else {
            shipHit = this.checkHit(this.player_one_game_info, guess)
            this.turn = this.player_one
            console.log(this.player_one_game_info);
        }
        console.log(shipHit);
        return shipHit
    }
    checkHit(player, guess) {
        for (let ship of player.ships) {
            let index = ship.locations.indexOf(guess)
            if (index >= 0) {
                console.log('HIT');
                ship.hits[index] = true
                return true
            }
        }
        return false
    }
    isSunk(playerName) {
        if (playerName === this.player_one) {
            for (let ship of this.player_one_game_info.ships) {
                let allSectionsHit = ship.hits.every((e) => {
                    return e == true
                })
                if (allSectionsHit && ship.sunk == false) {
                    ship.sunk = true
                    this.player_one_game_info.shipsSunk++
                    return {
                        name: ship.name,
                        shipsSunk: this.player_one_game_info.shipsSunk
                    }
                }
            }
        } else {
            for (let ship of this.player_two_game_info.ships) {
                let allSectionsHit = ship.hits.every((e) => {
                    return e == true
                })
                if (allSectionsHit && ship.sunk == false) {
                    ship.sunk = true
                    return {
                        name: ship.name,
                        shipsSunk: this.player_one_game_info.shipsSunk
                    }
                }
            }
        }
        return null
    }
}
module.exports = {
    Game   
}