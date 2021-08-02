module.exports = {
	name: 'fire',
	description: 'Fire at your oppenent from a range of A0-H7',
    args: true,
    usage: '<row> <column>',
	execute(message, args, game) {
        //check if game in progress
        if(!game.turn) {
            message.reply("No game in progress")
            return
        //if game in progress check if it is the message senders turn
        } else if (!(game.turn === message.author.username)) {
            message.reply("It is not your turn")
            return
        }
		if(!args.length) {
            message.reply("You didn't provide any co-ordinates")
            return
        }
        if(!/[a-h]|[A-H]/.test(args[0]) && args[0].length === 1) {
            message.reply("row argument must be between A-H")
            return
        }
        if(!/[0-7]/.test(args[1]) && args[1].length === 1) {
            message.reply("column argument must be Between 0-7")
            return
        }
        let gameOver = false
        if (game.fire(args[0], args[1])) {
            message.reply("Hit!")
            let sunkShip = game.isSunk(game.turn)
            if (sunkShip) {
                message.channel.send(`You have sunk the ${sunkShip.name} ship! You have now sunk a total of ${sunkShip.shipsSunk} ships!`)
                if (game.gameWon(message.author.username)) {
                    //TODO: add trophy emoji to congrats message using \:trophy:
                    message.channel.send(`CONGRATULATIONS ${message.author.username} you have won!`)
                    gameOver = true
                }
            }
        } else {
            message.reply("No hit")
        }
        if (!gameOver) {
            //show oppositions board
            message.channel.send(`Board:`)
            message.channel.send(`${game.showBoard(game.turn)}`)
            message.channel.send(`It is ${game.turn}'s turn`)
        }
        
        
	},
};