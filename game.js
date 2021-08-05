const default_game_info = require('./game_info.json');
const Player = require('./models/player.js')
const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')

const WIDTH = 900
const HEIGHT = 900
const BOARD_IMAGE = "./public/grid_2.png"
//enum object for colours
const COLORS = {
    RED: "#F00",
    BLUE: "#00F",
    BLACK: "000",
    WHITE: "FFF",
}

class Game {
    constructor() {
        this.player_one = null
        this.player_two = null
        this.turn = ""
        this.alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"]
        this.numbers = ["0", "1", "2", "3", "4", "5", "6", "7"]
        this.challengeIssued = false
        this.challengeAccepted = false
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
            board: {
                imageStr: "./public/player_one_board.png",
                canvas: null,
                context: null
            },
            //board: ['* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n'],
            surrendered: false
            
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
            board: {
                imageStr: "./public/player_one_board.png",
                canvas: null,
                context: null
            },
            //board: ['* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n','* ', '* ','* ','* ','* ','* ','* ','* \n'],
            surrendered: false
            
        }
    }
    set_player_one(id, name) {
        this.player_one = new PlayerInfo(id, name)
        console.log(`Set player 1 to ${this.player_one.name}`);
    }
    set_player_two(id, name) {
        this.player_two = new PlayerInfo(id, name)
        console.log(`Set player 2 to ${this.player_two.name}`);
    }
    start_game() {
        this.generate_ship_locations(this.player_one_game_info)
        this.generate_ship_locations(this.player_two_game_info)
        this.draw_base_board(this.player_one_game_info.board)
        this.draw_base_board(this.player_two_game_info.board)
        this.set_turn(this.player_two)
    }
    set_turn(player) {
        this.turn = player.name
    }
    generate_ship_locations(player) {
        let locations;
        for (let i = 0; i < player.numShips; i++) {
            do {
                locations = this.generate_ship(player.ships[i].locations.length)
            } while (this.collision(locations, player));
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
                    return true
                }
            }
        }
        return false
    }
    fire(row, col) {
        let shipHit = false;
        let rowAsNum = this.alphabet.indexOf(row.toUpperCase()) 
        let guess = rowAsNum + col
        if (this.turn === this.player_one.name) {
            shipHit = this.checkHit(this.player_two_game_info, guess)
            this.updateBoard(this.player_two_game_info, guess)
            this.turn = this.player_two.name
        } else {
            shipHit = this.checkHit(this.player_one_game_info, guess)
            this.updateBoard(this.player_one_game_info, guess)
            this.turn = this.player_one.name
        }
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
        console.log('MISS');
        return false
    }
    updateBoard(player, guess) {
        let shipHit = false
        const location = String(guess)
        const row = Number(location.charAt(0))
        const col = Number(location.charAt(1))
        const xPos = row * 100 + 100
        const yPos = col * 100 + 120
        for (let ship of player.ships) {
            if (ship.locations.includes(guess)) {
                player.board.context.fillStyle = '#00F'
                player.board.context.fillText('O',xPos,yPos)
                shipHit = true
                }
        }
        if (!shipHit) {
            player.board.context.fillStyle = '#F00'
                player.board.context.fillText('X',xPos,yPos)
        }
        //const buffer = player.board.canvas.toBuffer('image/png')
        //fs.writeFileSync(player.board.imageStr, buffer)
        // //TODO: Find a cleaner way to implement this
        // //convert location to string, get each char then convert back to number
        // const location = String(guess)
        // const row = Number(location.charAt(0))
        // const col = Number(location.charAt(1))
        // //where to update board
        // const boardIndex = (row * 8) + col
        // for (let ship of player.ships) {
        //     if (ship.locations.includes(guess)) {
        //         player.board[boardIndex] = player.board[boardIndex].replace("*", "O")
        //         shipHit = true
        //     }
        // }
        // if (!shipHit) {
        //     player.board[boardIndex] = player.board[boardIndex].replace("*", "X")
        // }
    }
    showBoard(playerName) {
        //let boardString = ""
        if (playerName == this.player_one.name) {
            return {
                canvas: this.player_one_game_info.board.canvas,
                imagePath: this.player_one_game_info.board.imageStr
            }
            // for (const char of this.player_one_game_info.board) {
            //     //boardString += char
            // }
        } else {
            // for (const char of this.player_two_game_info.board) {
            //     //boardString += char
            // }
            return {
                canvas: this.player_two_game_info.board.canvas,
                imagePath: this.player_two_game_info.board.imageStr
            }
        }
        //return boardString
    }
    isSunk(playerName) {
        if (playerName === this.player_one.name) {
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
                    this.player_two_game_info.shipsSunk++
                    return {
                        name: ship.name,
                        shipsSunk: this.player_two_game_info.shipsSunk
                    }
                }
            }
        }
        return null
    }
    gameWon(id) {
        if (id == this.player_one.id) {
            //player one wins
            if (this.player_two_game_info.shipsSunk == this.player_two_game_info.numShips || this.player_two_game_info.surrendered) {
                this.updateDatabase(this.player_one, this.player_two)
                this.endGame()
                return true
            }
        } else {
            //player two wins
            if (this.player_one_game_info.shipsSunk == this.player_one_game_info.numShips || this.player_one_game_info.surrendered) {
                this.updateDatabase(this.player_two, this.player_one)
                this.endGame()
                return true
            }
        }
        return false
    }
    async updateDatabase(winner, loser) {
        const winnerExists = await Player.exists({playerId: winner.id})
        const loserExists = await Player.exists({playerId: loser.id})
        //update player winners record first
        if (winnerExists) {
            const player = await Player.findOne({playerId: winner.id})
            const update = {wins: player.wins++}
            await player.updateOne(update)
            player.save()
        } else {
            //first win so manually enter Ws and Ls
            const player = new Player({playerId: winner.id, name: winner.name, wins: 1, losses: 0})
            player.save()
        }

        //update player losers record first
        if (loserExists) {
            const player = await Player.findOne({playerId: loser.id})
            const update = {losses: player.losses++}
            await player.updateOne(update)
            player.save()
        } else {
            //first loss so manually enter Ws and Ls
            const player = new Player({playerId: loser.id, name: loser.name, wins: 0, losses: 1})
            player.save()
        }
    }
    endGame() {
        this.player_two_game_info = default_game_info
        this.player_one_game_info = default_game_info
        this.player_one = null
        this.player_two = null
        this.turn = ""
        this.challengeIssued = false
        this.challengeAccepted = false
    }
    surrender(id) {
        if (id == this.player_one.id) {
            this.player_one_game_info.surrendered = true
            console.log(this.gameWon(this.player_two.id));
        } else {
            this.player_two_game_info.surrendered = true
            console.log(this.gameWon(this.player_one.id));
        }
    }
    draw_base_board(board) {
        board.canvas = createCanvas(WIDTH, HEIGHT)
        board.context = board.canvas.getContext("2d")
        board.context.font = 'bold 30pt Menlo'
        board.context.textAlign = 'center'
        board.context.fillStyle = '#fff'
        board.context.fillRect(0, 0, WIDTH, HEIGHT)

        loadImage(BOARD_IMAGE).then((image) => {
            board.context.fillStyle = '#000'
            board.context.drawImage(image, 50,50)

            let y = 40
            let x = 100
            for (const letter of this.alphabet) {
                board.context.fillText(letter, x, y)
                x += 100
            }
            y = 120
            x = 25
            for (const num of this.numbers) {
                board.context.fillText(num, x, y)
                y += 100
            }
        })
    }
}
class PlayerInfo {
    constructor(id, name) {
        this.name = name
        this.id = id
    }
}

module.exports = {
    Game,
    Player   
}