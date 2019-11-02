const Discord = require('discord.js');
const xp = require('../xp.json');

module.exports.run = async (bot, message, args) =>{
    if (!xp[message.author.id]) {
        ep[message.author.id] = {
            xp: 0,
            niveau: 1
        };
    }
    
    let cXp = xp[message.author.id].xp;
    let cNiveau = xp[message.author.id].niveau;
    let nextLevelUp = cNiveau *10;
    let XpNeededForLevelUp = nextLevelUp - cXp

    let NiveauEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.authpr.displayAvatrURL)
    .setColor('#600303')
    .addField('Niveau', cNiveau, true)
    .addField('Xp', cXp, true)
    .addField(`Points d'experience requis pour le prochain niveau : ${XpNeededForLevelUp}.`)
    .setFooter("| Niveau | Serveur des démons | Samaël | Développé par M - S#0246 |");

    message.channel.send(NiveauEmbed);
};

module.exports.help = {
    name: "niveau"
};
