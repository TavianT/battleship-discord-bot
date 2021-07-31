module.exports = {
	name: 'decline',
	description: 'Declines the game of battleship',
    args: false,
    //usage: '<><>',
	execute(message, args, game) {
		message.channel.send(`${message.author.username} has declined the challenge`);
        game.player_one = ""
	},
};