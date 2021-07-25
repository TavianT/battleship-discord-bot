class Game {
    constructor() {
        this.player_1 = ""
        this.player_2 = ""
        this.board = 
        `0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0
         0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0
         0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0
         0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0
         0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0
         0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0
         0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0
         0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0`
    }
    setPlayers(player_1, player_2) {
        this.player_1 = player_1
        this.player_2 = player_2
    }
}