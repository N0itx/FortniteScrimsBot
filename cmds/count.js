const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {

    const streamOptions = {seek: 0, volume: 1};
    
    console.log("Starting voice command");

    if (message.member.voiceChannel) 
    {
        if (!message.guild.voiceConnection)
        {
            let vc = message.member.voiceChannel;
            console.log("Next stop, connection");

            vc.join().then(connection => 
            {
                console.log("[VOICE CHANNEL] joined countdown channel.");
                const stream = ytdl('https://www.youtube.com/watch?v=oqSplPV9IyQ', {filter: 'audioonly'});
                const dispatcher = connection.playStream(stream, streamOptions);

                dispatcher.on("end", end =>
                {
                    console.log("[VOICE CHANNEL] left countdown channel.");
                    vc.leave();
                });
            }).catch(err => { console.log(err); });

        }
    }
	else{
		message.channel.send("Primero debes entrar a un canal de voz").then(msg => msg.delete(5000));	
	}
}



module.exports.help = {
    name: "count"
}