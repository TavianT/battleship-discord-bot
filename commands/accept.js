module.exports = {
	name: 'accept',
	description: 'Accept a game of battleship',
    args: false,
    //usage: '<><>',
	execute(message, args, game) {
        game.set_player_two(message.author.username)
		message.channel.send(`${message.author.username} has accepted the challenge. ${message.author.username} will go first.\nUse \`!bb fire <row> <col>\` to fire at the enemy\nUse \`!bb help\` for more info`);
		game.start_game()
	},
};