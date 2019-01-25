const Discord = require('discord.js');

module.exports.run = async (bot,message,args) => {
	
	let Embed = new Discord.RichEmbed()
		.setAuthor(bot.user.username + " Help", bot.user.avatarURL)	
		.addField("Comandos",
			"**!count :** ``Inicia el conteo en el canal de voz en el que estes`` \n" +
			"**!start :** ``Inicia la recoleccion de digitos para el emparejamiento`` \n" +
			"**!text-count :** ``Para hacer un conteo de 10s mediante texto`` \n" +
			"**!hostrole <role> :** ``Espesifica quienes seran los que podran usar el bot`` \n" +
			"**!prox <num> :** ``Para anunciar cuando sera la proxima partida`` \n" +
			"**!clean <num> :** ``Elimina mensajes del chat`` \n"
		, false)
		.addBlankField(false)
		.addField("Payment", "One time fee of 5$ to help with server cost", false)
		.setFooter("ShiroLB#1110 for more support", "https://i.imgur.com/GiSGs06.png")
		.setColor("#FFB200");
		
	message.channel.send({ embed: Embed});
}


module.exports.help = {
	name: "help"
}