const {Game} = require('../game.js')

describe('Fire function from Game class', () => {
    let game = new Game()
    beforeAll(() => {
        game.set_player_one('266241948824764416', 'testa')
        game.set_player_two('266241948824764949', 'faker')
        game.start_game()
    })

    afterAll(() => {
        game.endGame()
    })

    it('Should return true after firing at correct location', () => {
        const location = game.player_one_game_info.ships[0].locations[0].toString()
        const row = game.alphabet[location.charAt(0)]
        const col = location.charAt(1)
        expect(game.fire(row,col)).toEqual(true)
    })
})