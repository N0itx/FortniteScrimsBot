
module.exports.run = async (bot,message,args) => {

    message.guild.leave()
}


module.exports.help = {
	name: "leave"
}