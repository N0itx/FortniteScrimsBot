const Discord = require('discord.js');
const fs = require('fs');


module.exports.run = async (bot, message, args) => {

    if (args.legnth === 0){
        message.channel.send("Se necesita un rol después del comando - ``Ejem: !hostrole @YouScrimHostRole``");
    }
    else if (args.length > 0){
        let roles_raw = fs.readFileSync('./roles.json');
        let roles_array = JSON.parse(roles_raw);

        let role = args[0];
        let found = false;

        for (var i = 0; i < roles_array.roles.length; i++){
            if (role === roles_array.roles[i]){
                found = true;
                message.channel.send(role + " ya estaba agregado en los roles permitidos");
                return;
            }
        }

        let roleMessage = new Discord.RichEmbed()
            .setAuthor("Fortnite Scrims", bot.user.avatarURL)
            .setTitle("Se a agregado el rol correctamente")
            .setDescription("Ahora las personas que tengan el rol estan autorizadas a usar los comandos del bot")
            .setFooter("Usa !help para mas info")
            .setColor("#FFB200");

        if (!found){
            roles_array.roles.push(role);
            let roles_write = JSON.stringify(roles_array);
            fs.writeFileSync('./roles.json', roles_write);
            message.channel.send({embed: roleMessage});
        }
    }
}


module.exports.help = {
    name: "hostrole"
}