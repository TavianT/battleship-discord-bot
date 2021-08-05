module.exports = {
	name: 'decline',
	description: 'Declines the game of battleship',
    args: false,
    //usage: '<><>',
	execute(message, args, game) {
		//Check if match in progress
        if (!game.turn) {
            return message.reply("there is no game in progress!")
        }
		message.channel.send(`${message.author.username} has declined the challenge`);
        game.player_one = null
	},
};