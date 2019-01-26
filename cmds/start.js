const Discord = require('discord.js');
const Listing = require('./../modules/Listing');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    let snipeChannel = message.channel;
    const filter = m => !m.author.bot;
    let game = new Listing();

    if (!args[0]) return message.channel.send("Especifica el Modo de Juego!").then(msg => msg.delete(5000));

    let modo = args;

    let editLast3 = null;

    let statMessage = new Discord.RichEmbed()
        .setAuthor("Fortnite Scrims", bot.user.avatarURL)
        .addField("Iniciando Partida", "Empieza una scrim. Sigue las instrucciones a continuación y cualquier otro mensaje que envíe el bot.")
        .addField("Modo de juego", modo)
        .addField("Instrucciones", "Por favor escriba los últimos 3 digitos de su ID de partida")
        .setFooter("Usa !help para mas info")
        .setColor("#FFB200");
    
    message.channel.send({embed: statMessage});

    let last3 = new Discord.RichEmbed()
        .setTitle("Ultimos 3 digitos")
        .setColor("#FFB200")

    setTimeout(async () => {
        editLast3 = await message.channel.send({embed: last3});
    }, 10);

    message.channel.send("@everyone");

    const collector = snipeChannel.createMessageCollector(filter, {max: 200, maxMatches: 200, time: 180000});

    collector.on('collect', m => {
        //console.log(`Collected ${m.content} | ${m.author.username}`);

        if (game.data.length === 0 && m.content.length === 3){
            game.addID(m.content.toUpperCase(), m.author);
        }else if (m.content.length === 3){
            if (game.userPresent(m.author)){
                game.deleteUserEntry(m.author);

                if (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author);
                }else {
                    game.addID(m.content.toUpperCase(), m.author);
                }
            } else {
                if (game.idPresent(m.content.toUpperCase())){
                    game.addUser(m.content.toUpperCase(), m.author);
                } else {
                    game.addID(m.content.toUpperCase(), m.author);
                }
            }
        }

        game.sort();

        let str = "";
        last3 = new Discord.RichEmbed()
            .setTitle("Ultimos 3 digitos")
            .setColor("#FFB200")

        for (var i = 0; i < game.data.length; i++){
            str = "";
            for (var j = 0; j < game.data[i].users.length; j++){
                str += game.data[i].users[j] + "\n";
            }
            last3.addField(`${game.data[i].id.toUpperCase()} - ${game.data[i].users.length} players`, str, true);
            last3.setFooter(`[ ${game.data.length} Servers | ${game.users.length} Players ]`)
        }

        let time = 3;
        let timeOut = setInterval(() => {
            if (time === 1){
                time -= 1;
                clearInterval(timeOut);
            } else {
                time -= 1;
            }
            if(time == 0){
                clearInterval(timeOut);
                collector.stop("TimeOut");
            }
    
        },60000);

        editLast3.edit({embed: last3}).catch((err) => {
            console.log("Caught eddit error");
        });

        if (m.deletable){
            m.delete().catch((err) => {
                console.log("Cant delete");
                console.log(err);
            });
        }
    });

    collector.on('end', collected => {
    console.log(`Collected ${collected.size} items`);

    let endMessage = new Discord.RichEmbed()
        .setTitle("No se aceptan más códigos en este punto.")
        .setDescription("Buena suerte y diviértete en tu juego!")
        .setColor("#FF5D00");

        message.channel.send({embed: endMessage});
	});
}

module.exports.help = {
    name: "start"
}