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
        if (game.challengeIssued) {
            return message.reply(`A challenge has already been issued by ${game.player_one}`)
        }
        const taggedUser = message.mentions.users.first();
        if (taggedUser.username == message.author.username) {
            return message.reply("You cannot challenge yourself")
        }
		message.channel.send(`${message.author.username} challenges ${taggedUser.username} to a game of Battleship.\n${taggedUser} to accept enter \`!bb accept\` to decline enter \`!bb decline\``);
        game.set_player_one(message.author.id,message.author.username)
        game.challengeIssued = true
	},
};