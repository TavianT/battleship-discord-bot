const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose');
const { prefix, token, mongoUsername, mongoPassword } = require('./config.json');
const game = require('./game');

const client = new Discord.Client();
client.commands = new Discord.Collection();
let new_game

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

//connect to mongoDB
const dbUri = `mongodb+srv://${mongoUsername}:${mongoPassword}@cluster0.4yiwl.mongodb.net/battleship?retryWrites=true&w=majority`
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
	console.log("MongoDB connection successful");
	client.once('ready', () => {
		console.log('Ready!');
		new_game = new game.Game();
	});
})
.catch((err) => console.error(err))

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
    }

    try {
		command.execute(message, args, new_game);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);