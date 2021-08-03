const Player = require('../models/player.js')
module.exports = {
	name: 'record',
	description: 'Check a win loss record for yourself or another user',
    args: false,
    usage: '<@username>',
	async execute(message, args, game) {
        let player = null
		if(!message.mentions.users.size) {
            const exists = await Player.exists({playerId: message.author.id})
            if (!exists) {
                return message.reply(`you don't have a record`)
            }
            player = await Player.findOne({playerId: message.author.id})
        } else {
            const taggedUser = message.mentions.users.first();
            const exists = await Player.exists({playerId: taggedUser.id})
            if (!exists) {
                return message.reply(`${taggedUser.username} does not have a record`)
            }
            player = await Player.findOne({playerId: taggedUser.id})
        }
        message.channel.send(`${player.name}'s record\nWins: ${player.wins}\nLosses: ${player.losses}`)
	},
};