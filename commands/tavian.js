module.exports = {
	name: 'tavian',
	description: 'All about me tavian, the creator',
    args: false,
    //usage: '<><>',
	execute(message, args, game) {
		message.channel.send(`This bot was created by me Tavian Taylor, a final year computer science student at Nottingham Trent University and part time Software Engineer Inter at HPE.\nTo see to source code check out my github: https://github.com/TavianT/battleship-discord-bot\nTo connect with me check out my LinkedIn: https://www.linkedin.com/in/tavian-taylor-86ba8b18a/`);
	},
};