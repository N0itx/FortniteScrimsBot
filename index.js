// require packages
const Discord = require('discord.js');
const settings = require('./settings.json');
const fs = require('fs');

//require('dotenv/config');//
//const http = require('http');
//const port = process.env.PORT || 3000;
//http.createServer().listen(port);//this is a simple server

// initialise are bot
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// import bot setting (data)
const prefix = settings.prefix;
const token = settings.token;
//const token = process.env.TOKEN;
const owner = settings.owner;

//read commands files
fs.readdir('./cmds', (err,files) => {
    if (err) {
        console.log(err);
    }

    let cmdFiles = files.filter(f => f.split(".").pop() === "js");

    if (cmdFiles.length === 0){
        console.log("No files found");
        return;
    }

    cmdFiles.forEach((f,i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i+1}: ${f} loaded`);
        bot.commands.set(props.help.name, props);
    })
})

let raw = fs.readFileSync('./roles.json');
let allowedRoles = JSON.parse(raw);

let validation = function(serverRoles, userRoles){
    let val = false;
    serverRoles.forEach((role) => {
        userRoles.forEach((usr) => {
            if (role == usr){
                val = true;
            }
        });
    });
    return val;
}


bot.on('ready', async () => {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
    bot.user.setActivity("Fortnite Scrims | !help", {type: "STREAMING", url: "https://twitch.tv/n0itx"});

});

bot.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});
  
  bot.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

bot.on('message',msg => {
    if (msg.channel.type === "dm") return;
    if (msg.author.bot) return;

    let msg_array = msg.content.split(" ");
    let command = msg_array[0];
    let args = msg_array.slice(1);

    if (!command.startsWith(prefix)) return;

    if (bot.commands.get(command.slice(prefix.length))){
        msg.channel.bulkDelete(1);
        if (validation(allowedRoles.roles,msg.member.roles.array()) || msg.member.id === owner){
                let cmd = bot.commands.get(command.slice(prefix.length));
                if (cmd){
                    cmd.run(bot,msg,args);
                }
        } else {
                msg.channel.send("No tienes acceso a los comandos de este bot.");
        }
    }
});

bot.on('error', err => {
    console.log(err);
});



bot.login(token);