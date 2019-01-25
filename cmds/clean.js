
module.exports.run = async (bot,message,args) => {

    if (!args[0]) return message.channel.send("Especifica el número de mensajes!");
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(1000));
    })
	
}


module.exports.help = {
	name: "clean"
}