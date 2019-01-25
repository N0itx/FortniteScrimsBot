
module.exports.run = async (bot,message,args) => {

    message.channel.send(`Ping: ${bot.ping}`).then(msg => msg.delete(5000));	
}


module.exports.help = {
	name: "ping"
}