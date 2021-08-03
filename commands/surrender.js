module.exports = {
	name: 'surrender',
	description: 'Forfeit the match!',
    args: false,
	execute(message, args, game) {
		//Check if match in progress
        if (!game.turn) {
            return message.reply("there is no game in progress!")
        }
        //Check if message author is part of match
        console.log(`player 2 id: ${game.player_two.id}`);
        console.log(`author id: ${message.author.id}`);
        if(message.author.id != game.player_one.id && message.author.id != game.player_two.id) {
            return message.reply("you are not a part of this match!")
        }

        game.surrender(message.author.id)
        message.channel.send(`${message.author.username} has surrendered!`)

	},
};