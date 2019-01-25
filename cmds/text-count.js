module.exports.run = async (bot, message, args) => {
    let time = 5;
    message.channel.send(time);
    
    setInterval(() => {
        /*if (time != 0){
            time--;
            message.channel.send(time);
        }else if (time === 0){
            clearInterval(this);
        }*/
        if (time === 0){
            clearInterval(this);
        } else {
            time -= 1;
            message.channel.send(time);
        }
    },1000)

}


module.exports.help = {
    name : "text-count"
}
