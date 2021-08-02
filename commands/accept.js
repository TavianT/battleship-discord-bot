module.exports = {
	name: 'accept',
	description: 'Accept a game of battleship',
    args: false,
    //usage: '<><>',
	execute(message, args, game) {
		if (game.challengeAccepted) {
			return message.reply(`The challenge has already been accepted`)
		}
        game.set_player_two(message.author.username)
		game.challengeAccepted = true
		message.channel.send(`${message.author.username} has accepted the challenge. ${message.author.username} will go first.\nUse \`!bb fire <row> <col>\` to fire at the enemy\nUse \`!bb help fire\` for more info`);
		game.start_game()
	},
};