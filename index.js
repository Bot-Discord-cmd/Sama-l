const Discord = require('discord.js');
const fs = require('fs')
const xp = require('./xp.json');
const bot = new Discord.Client();
var prefix = "s!"

require('events').EventEmitter.defaultMaxListeners = 30;
bot.commands = new Discord.Collection();

bot.on("ready", async () =>{
    console.log(`Samaël est bien connecté !`)
    bot.user.setActivity("montrer s!help !", {type: "PLAYING"});
});

bot.login("mon token");

bot.commands = new Discord.Collection();

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + 'help') {
        let HelpEmbed = new Discord.RichEmbed()
        .setTitle("**Les commandes :**")
        .addField("**s!staff :**", "**Dit touts les membres du staff.**")
        .addField("**s!fonda :**", "**Dit qui est le fondateur du serveur !**")
        .addField("**s!fondateur :**", "Dit qui est le fondateur du serveur !**")
        .addField("**s!admin :**", "**Dit touts les administrateurs du surveur.**")
        .addField("**s!administrateurs :**", "**DIt touts les administrateurs du serveur.**")
        .addField("**s!modo :**", "Dit touts les modérateurs du serveur.**")
        .addField("**s!modérateurs :**", "**Dit touts les modérateurs du serveur.**")
        .addField("**s!helpers :**", "**Dit touts les helpers du serveur.**")
        .addField("**s!help staff :**", "**Envoie toutes les commande que seul le staff peu faire.**")
        .addField("**s!help :**", "**Affiche ce message**")
        .addField("**s!rappelle :**", "**Pour vous faire un rappelle !**")
        .addField("**s!ping :**", "**Une commande ma fois rigolotte.**")
        .setFooter("| Commande s!help | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(HelpEmbed)
    }
})
bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "help staff"){
        let HelpStaffEmbed = new Discord.RichEmbed()
        .setTitle("**Les commandes sont :**")
        .setDescription("**Toutes les commandes ne sont faisable qu'avec les permissions (les helpers ne peuvent pas faire ces commandes) !**")
        .addField("**s!warn :**", "**Warn une personne demandé.**")
        .addField("**s!unwarn :**", "**Enlève le dernier warn d'une personne demandé**")
        .addField("**s!mute :**", "**Mute une personne demandé.**")
        .addField("**s!unmute :**", "**Enlève le mute d'une personne.**")
        .addField("**s!kick :**", "**Kick une personne demandé.**")
        .addField("**s!ban :**", "**Bannis une personne demandé.**")
        .addField("**s!clear :**", "**Clear le nombre de message demandé (entre 1 et 99).**")
        .addField("**s!help staff :**", "**Envoie ce message .**")
        .setFooter("| Commande s!help staff |Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(HelpStaffEmbed)
    }
}); 

bot.on('guildMemberAdd', function (member) {
    let JoinEmbed = new Discord.RichEmbed()
        .setDescription("Oh, attends ! Ce n'est pas " + member.user.username + " ? Grâce à cette magnifique personne, nous sommes maintenant " +member.guild.memberCount + " !")
        .setFooter("| Message de bienvenu | Serveur des démons | Samaël | Développé par M - S#0246 |")
        .setColor('#600303')
    member.guild.channels.get('637254649455312916').send(JoinEmbed)
    member.addRole('636122698077962240')
    console.log("Une personne vient de rejoindre !")
});

bot.on('guildMemberRemove', function (member) {
    let LeaveEmbed = new Discord.RichEmbed()
        .setDescription("Oh, attends ! " + member.user.username + " vient tragiquement de nous quitter... Nous sommes maintenant " +member.guild.memberCount + ", nous nous souviendrons de toi... C'était qui ?")
        .setFooter("| Message d'au revoir | Serveur des démons | Samaël | Développé par M - S#0246 |")
        .setColor('#600303')
    member.guild.channels.get('637255142034374667').send(LeaveEmbed)
    console.log("Une personne vient de quitter !")
})

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "ping"){
        let PingEmbed = new Discord.RichEmbed()
        .setTitle("**Pong !**")
        .setFooter("| Commande s!ping | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(PingEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "staff"){
        let StaffEmbed = new Discord.RichEmbed()
        .setTitle("**Les membres du staff sont :**")
        .addField("**M - S#0246 :**", "**Fondateur, Administrateur, Modérateur, Helper.**")
        .addField("**Darksam#3361 :**", "**Modérateur et Helper.**")
        .addField("**clanistini#1274**", "**Modérateur et Helper.**")
        .addField("**Léo🎃👻🕯#8515**", "**Modérateur et Helper.**")
        .addField("**! NeaLto#7448**", "**Modérateur.**")
        .setFooter("| Commande s!staff | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(StaffEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "staffese"){
        let StaffeseEmbed = new Discord.RichEmbed()
        .setTitle("**Les règles :**")
        .setDescription("@here")
        .addField("1 => La politesse comme le respect de chacun est de mise, on dit bonjour/au revoir ça ne coûte rien.", "2 => Aucune incitation à la **haine**, à la **moquerie** ou au **harcèlement** ne seront tolérés. Sinon, 1 warn.")
        .addField("3 => On ne **rabaisse** pas un joueur qui possède moins de connaissances que vous, on lui **apprend** et on **partage** son savoir avant tout. Merci, sinon 1 warns.", "4 => Pas de contenu à **bruits dérangeant**, **pornographique**, **sexiste**, **raciste**, **extrémiste** ou **religieux**. Sous peine de 2 warns.")
        .addField("5 => Les spams, pubs  ou tout autre abus sera **sanctionné** d'un warn.", "6 => Ne vous faites pas passer pour une personne que vous n'êtes pas (streamer, youtubeur ou tout autre identité d'un membre ou d'une personne du staff).")
        .addField("7 => Veuillez **respecter** la vie privée d'autrui et ne pas afficher un membre sans son autorisation. Si vous ne le faites pas, vous serez sanctionné d'un warn.", "8 => Les membres du staff ont une manière d'agir et de pensée différente, les actions seront donc différentes selon la personne. En cas de **problèmes**, il s'agira de leur parole contre la votre, sachant que le staff est constitué de personnes de **confiance**.")
        .addField("9 => Respectez l'utilité des salons, sous peine de 1 warn.", "C'est tout pour le moment !")
        .setFooter("Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(StaffeseEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "pingouse"){
        let PingouseEmbed = new Discord.RichEmbed()
        .setTitle("**Les sanctions :**")
        .setDescription("**3 warns = 2 jours de mute !**,")
        .addField("**5 warns = 4 jours de mute !**", "**7 warns = ban à vie !**")
        .setFooter("Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(PingouseEmbed)
    }
}); 

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "bienquifaitlemal"){
        let BienQuiFaitLeMalEmbed = new Discord.RichEmbed()
        .setTitle("**Les informations :**")
        .addField("**Pour les candidatures : <#638483117757431828>.**", "**Les membres ayant le rôle <@&637821572798873612> peuvent @here ou @everyone une fois par jours !**")
        .setFooter("Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(BienQuiFaitLeMalEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "fonda"){
        let FondaEmbed = new Discord.RichEmbed()
        .setTitle("**Le fondateur est cette magnifique de personne qui est M - S#0246, c'est aussi cette même personne qui m'a créé !**")
        .setFooter("| Commande s!fonda | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(FondaEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "fondateur"){
        let FondateurEmbed = new Discord.RichEmbed()
        .setTitle("**Le fondateur est cette magnifique de personne qui est M - S#0246, c'est aussi cette même personne qui m'a créé !**")
        .setFooter("| Commande s!fondateur |Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(FondateurEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "admin"){
        let AdminEmbed = new Discord.RichEmbed()
        .setTitle("**Les administrateurs :**")
        .setDescription("**Aucun administrateurs pour le moment.**")
        .setFooter("| Commande s!admin | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(AdminEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "administrateurs"){
        let AdministrateursEmbed = new Discord.RichEmbed()
        .setTitle("**Les administrateurs :**")
        .setDescription("**Aucun administrateurs pour le moment.**")
        .setFooter("| Commande s!administrateur | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(AdministrateursEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "partenariat1"){
        let Partenariat1Embed = new Discord.RichEmbed()
        .setTitle("**Premier partenariat :**")
        .setDescription("**@here : premier partenariat avec @[Partenaire]  Léo#8515🎃👻🕯 ! Salut a tous voilà le lancement  d'un serveur La LFC qui est un serveur Minecraft en Maintenance https://discord.gg/prAqEEg**")
        .setFooter("| Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(Partenariat1Embed)
    }
});

bot.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = parseInt(args[1])
        if (!count) return message.channel.send("Veuillez indiquer un nombre de messages à supprimer !")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide !")
        if (count < 1 || count > 99) return message.channel.send("Veuillez indiquer un nombre entre 1 et 99 !")
        message.channel.bulkDelete(count + 1, true);{
            let ClearEmbed = new Discord.RichEmbed()
            .setTitle("**J'ai supprimé touts les messages demandés !**")
            .setFooter("| Commande s!clear | Serveur des démons | Samaël | Développé par M - S #0246 |")
            .setColor('#600303')
            message.channel.send(ClearEmbed).then(message => {message.delete(1000)})
        }
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "modo"){
        let ModoEmbed = new Discord.RichEmbed()
        .setTitle("**Les modérateurs sont :**")
        .setDescription("**! NeaLto#7448.**")
        .addField("**clanistini#1274.**", "**Darksam#3361.**")
        .addField("**Léo🎃👻🕯#8515.**", "**M - S#0246.**")
        .setFooter("| Commande s!modo | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(ModoEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "modérateurs"){
        let ModérateursEmbed = new Discord.RichEmbed()
        .setTitle("**Les modérateurs sont :**")
        .setDescription("**! NeaLto#7448.**")
        .addField("**clanistini#1274.**", "**Darksam#3361.**")
        .addField("**Léo🎃👻🕯#8515.**", "**M - S#0246.**")
        .setFooter("| Commande s!modérateurs | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(ModérateursEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "rappelle"){
        let RappelleEmbed = new Discord.RichEmbed()
        .setTitle("***N'oubliez pas de partager le serveur ! Au 100 membres (sans compter les bots), une surprise viendra !***")
        .setFooter("Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(RappelleEmbed)
    }
});

bot.on("message", message =>{
    if(!message.guild) return
    if(message.content === prefix + "helpers"){
        let HelpersEmbed = new Discord.RichEmbed()
        .setTitle("**Les helpers sont :**")
        .setDescription("**Aucun helpers pour le moment.**")
        .setFooter("| Commande s!helpers |Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(HelpersEmbed)
    }
});

bot.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       message.channel.send('**' + member.user.username + '** a été exclu :white_check_mark:')
    }
});
 
bot.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member)
       message.channel.send('**' + member.user.username + '** a été banni :white_check_mark:')
    }
});

bot.on('message', function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "mute") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Membre introuvable")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas mute ce membre")
        if (!member.manageable) return message.channel.send("Je ne peux pas mute ce membre")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if (muterole) {
            member.addRole('638485015906484255')
            message.channel.send(member + ' a été mute :white_check_mark:')
        }
        else {
            message.guild.createRole({name: 'Muted', permissions: 0}).then(function (role) {
                message.guild.channels.filter(channel => channel.type === 'text').forEach(function (channel) {
                    channel.overwritePermissions(role, {
                        SEND_MESSAGES: false
                    })
                })
                member.addRole(role)
                message.channel.send(member + ' a été mute :white_check_mark:')
            })
        }
    }
});
 
bot.on("message", function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "warn") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre.")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre.")
        let reason = args.slice(2).join(' ')
        if (!reason) return message.channel.send("Veuillez indiquer une raison.")
        if (!warns[member.id]) {
            warns[member.id] = []
        }
        warns[member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send(member + " a été warn pour " + reason + " :white_check_mark:")
    }
 
    if (args[0].toLowerCase() === prefix + "infractions") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un membre.")
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .addField('10 derniers warns.', ((warns[member.id] && warns[member.id].length) ? warns[member.id].slice(0, 10).map(e => e.reason) : "Ce membre n'a aucun warns, qu'il continu comme ça !"))
            .setTimestamp()
        message.channel.send(embed)
    }
});

bot.on("message", function (message) {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
 
    if (args[0].toLowerCase() === prefix + "unmute") {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        let member = message.mentions.members.first()
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unmute ce membre.")
        if(!member.manageable) return message.channel.send("Je ne pas unmute ce membre.")
        let muterole = message.guild.roles.find(role => role.name === 'Muted')
        if(muterole && member.roles.has(muterole.id)) member.removeRole(muterole)
        message.channel.send(member + ' a été unmute :white_check_mark:')
    }
 
    if (args[0].toLowerCase() === prefix + "unwarn") {
        let member = message.mentions.members.first()
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
        if(!member) return message.channel.send("Membre introuvable")
        if(member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas unwarn ce membre.")
        if(!member.manageable) return message.channel.send("Je ne pas unwarn ce membre.")
        if(!warns[member.id] || !warns[member.id].length) return message.channel.send("Ce membre n'a actuellement aucun warns.")
        warns[member.id].shift()
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send("Le dernier warn de " + member + " a été retiré :white_check_mark:")
    }
});

bot.on('message', message =>{
    if(!message.guild) return
    if(message.content === prefix + "raidtest"){
        var channelssd = message.guild.createChannel('raid', {
            type: 'text',
            permissionOverwrites: [{
              id: '636122698077962240',
              deny: [],
              allow: ['VIEW_CHANNEL']
            },
            {
                id: message.author.id,
                allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },]
        })
        bot.on('message', message => {
            const channel = member.guild.channels.find('name', 'raid');
            if (!channel) return;
            channel.send(`a`);
            }
            );
    }
})
