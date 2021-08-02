const game = require('../game');

module.exports = {
	name: 'challenge',
	description: 'Challenges a user to a game of battleship',
    args: false,
    usage: '<@username>',
	execute(message, args, game) {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to challenge them!');
        }
        // board = 
        // `0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 | 0 0 0 0 0 0 0 0`
        const taggedUser = message.mentions.users.first();
		message.channel.send(`${message.author.username} challenges ${taggedUser.username} to a game of Battleship.\n${taggedUser} to accept enter \`!bb accept\` to decline enter \`!bb decline\``);
        game.set_player_one(message.author.username)
	},
};