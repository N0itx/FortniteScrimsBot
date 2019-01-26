const Discord = require('discord.js');

module.exports.run = async (bot,message,args) => {

	let time = args;
    let editTime = "";

    if (!args[0]) return message.channel.send("Especifica los minutos!").then(msg => msg.delete(5000));

    message.channel.send("@everyone");

    let timeEmbed = new Discord.RichEmbed()
		.setAuthor(bot.user.username, bot.user.avatarURL)
        .setTitle("Siguiente partida en :")
        .setDescription(time + " minutos")
        .setColor("#FFB200");

    setTimeout(async () => {
        editTime = await message.channel.send({ embed: timeEmbed}).catch( (err) => {
            console.log("Cant edit deleted message");
        });
    }, 10);

    let timeInterval = setInterval(() => {
        if (time === 1){
            time -= 1;
            timeEmbed.setDescription(time + " minuto");
            clearInterval(timeInterval);
        } else {
            time -= 1;
            timeEmbed.setDescription(time + " minutos");
        }
        if(time === 0)
        {
            timeEmbed.setTitle("En segundos comenzará la siguiente partida");
            timeEmbed.setDescription("entra al chat de voz correspondiente para escuchar el conteo");   
        }

        editTime.edit({embed: timeEmbed}).catch((err) => {
            console.log("cant edit");
            clearInterval(timeInterval);
        });

    },60000);//60000
	
}


module.exports.help = {
	name: "prox"
}