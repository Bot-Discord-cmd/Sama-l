const Discord = require('discord.js');
const fs = require('fs')
const bot = new Discord.Client();
const warns = JSON.parse(fs.readFileSync('./warns.json'));
const token = JSON.parse(fs.readFileSync('./token.json'))
const ms = require('ms')
const serveurStats = {
    guildID: '636002793970466817',
    totalUsersID: '656842533191811072',
    memberCountID: '656842813178380290',
    botCountID: '656842863115501588'
};
var prefix = "s!"

{var MpEmbed = new Discord.RichEmbed() 
.setTitle("**Touts messages envoyés en privé au BOT ne sera pas lu, donc aucunes commandes ne sont fonctionnelles.**")
.setFooter('| Messages privé | Samaël | Développer par M - S#0246 |')
.setColor('#600303')}

{var MauvaisSalonRôlesEmbed = new Discord.RichEmbed()
.setTitle('**Veillez faire cette commande de rôles dans le salon <#646387052757254165>.**')
.setFooter('| Mauvais salon rôles | Samaël | Développer par M - S#0246 |')
.setColor('#600303')}

{var TuAsDéjàCeRôleEmbed = new Discord.RichEmbed()
.setTitle('**Vous avez déjà ce rôle.**')
.setFooter('| Vous avez déjà ce rôle | Samaël | Serveur des démons | Développer par M - S#0246 |')
.setColor('#600303')}

{var TuNAsPasCeRôleEmbed = new Discord.RichEmbed()
.setTitle("**Vous n'avez pas ce rôle.**")
.setFooter("| VOus n'avez pas ce rôle | Samaël | Serveur des démons | Développer par M - S#0246 |")
.setColor('#600303')}

require('events').EventEmitter.defaultMaxListeners = 40;
bot.commands = new Discord.Collection();

bot.on('message', message => {
    if(!message.guild) return(message.author.send(MpEmbed))
})

bot.on("ready", async () =>{
    var TailleMembres = bot.user.size;
    console.log(`Samaël est bien connecté !`)
    bot.user.setActivity(`montrer s!help !`, {type: "PLAYING"});
});

bot.login(token);

bot.commands = new Discord.Collection();

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

    if (!message.guild) return
    if (args[0].toLowerCase() === prefix + 'kick') {
       if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande.")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas kick cet utilisateur :x:")
       if (!member.kickable) return message.channel.send("Je ne peux pas exclure cet utilisateur :sunglass:")
       member.kick()
       let raison1 = args.slice(2).join(' ')
       let KickMpEmbed = new Discord.RichEmbed()
       .setTitle(`Vous avez étez kick pour ${raison1}`)
       .setColor('#600303')
       .setFooter('| Message de kick privé | Serveur des démons | Samaël | Développer par M - S#0246 |')
       member.send(KickMpEmbed)
       message.channel.send('**' + member.user.username + `** a été exclu pour la raison ${raison1} :white_check_mark:`)
    }    

    const command = args.shift().toLowerCase();
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return('**Tu ne peux pas utiliiser cette commande.**');
    if(command === prefix + "say"){
        let text = args.join(" ");
        let SayEmbed = new Discord.RichEmbed()
        .setTitle(`${text}`)
        .setColor('#600303')
        .setFooter('| Say | Serveur des démons | Samaël | Développé par M - S#0246 |')
        message.delete();
        message.channel.send(SayEmbed);
    }

    if(!message.guild) return
    if(!message.member.hasPermission('ADMINISTRATOR')) return('**Tu ne peux pas utiliiser cette commande.**');
    if(message.member.hasPermission('ADMINISTRATOR')) return("**Tu as demandé l'arrêt du BOT.**");
    if(message.content === prefix + 'stop') {
        message.channel.send("**Le BOT s'arrête.**")
        .then(message => client.destroy());
    }
      

    if (!message.guild) return
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
       if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande ;(")
       let member = message.mentions.members.first()
       if (!member) return message.channel.send("Veuillez mentionner un utilisateur :x:")
       if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send("Vous ne pouvez pas bannir cet utilisateur :x:")
       if (!member.bannable) return message.channel.send("Je ne peux pas bannir cet utilisateur :sunglass:")
       message.guild.ban(member)
       message.channel.send('**' + member.user.username + '** a été banni :white_check_mark:')
    }

    if (!message.guild) return

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
 
    if(!message.guild) return

    if (message.content === prefix + "warn") {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return('**Tu ne peux pas utiliser cette commande.**');
        let member = message.mentions.members.first()
        if(!member) return('**Veillez mentionner un utilisateur à warn.**')
        if (member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return('**Vous ne pouvez pas warn ce membre.**')
        let reason = args.slice(2).join(' ')
        if(!reason) return('**Veillez indiquer une raison.**')
        if(!warns[member.id]) {
            warn[member.id] = []
        }
        warns[member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send(`@${member.id} à été warn par @${message.author.id} pour ${reason}.**`)
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

    if (!message.guild) return 
 
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

bot.on('guildMemberAdd', function (member) {
    let JoinEmbed = new Discord.RichEmbed()
        .setDescription("**Oh, attends ! Ce n'est pas " + member.user.username + " ? Grâce à cette magnifique personne, nous sommes maintenant " + member.guild.members.filter(m => !m.user.bot).size + " !**")
        .setFooter("| Message de bienvenu | Serveur des démons | Samaël | Développé par M - S#0246 |")
        .setColor('#600303')
    member.guild.channels.get('649130504573943808').send(JoinEmbed)
    member.addRole('649130496084672532')
    console.log("Une personne vient de rejoindre !")

});

bot.on('guildMemberRemove', function (member) {
    let LeaveEmbedDeux = new Discord.RichEmbed()
    .setTitle(`**Oh, tu nous quitte,  j'aurais bien aimer que tu reste ${member}, mais tu peux revenir si tu veux ^^, grâce à ça : https://discord.gg/aHTPyR2, tu peux revenir, on te mangera pas !`)
    .setColor('#600303')
    .setFooter("| Message d'au revoir | Samaël | Développpé par M - S |")
     // member.send(LeaveEmbedDeux)
    let LeaveEmbed = new Discord.RichEmbed()
        .setDescription("**Oh, attends ! " + member.user.username + " vient tragiquement de nous quitter... Nous sommes maintenant " + member.guild.members.filter(m => !m.user.bot).size + ", nous nous souviendrons de toi... C'était qui ?**")
        .setFooter("| Message d'au revoir | Serveur des démons | Samaël | Développé par M - S#0246 |")
        .setColor('#600303')
    member.guild.channels.get('649130505710600204').send(LeaveEmbed)
    console.log("Une personne vient de quitter !")
});

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
        .addField('**s!help roles :**', "**Envoie toutes les commandes de catégories d'ajout ou de retirement de rôles.**")
        .addField('**Le site :**', '[**Clique-moi dessus pour directement lançer le site.**](https://serveur-des-demons.jimdosite.com/)')
        .addField("**s!rappelle :**", "**Pour vous faire un rappelle !**")
        .addField('**s!date :**', '**Te donne la date.**')
        .addField("**s!ping :**", "**Une commande ma fois rigolotte.**")
        .setFooter("| Commande s!help | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(HelpEmbed)
    }

    if(!message.guild) return
    if(message.content === prefix + "help staff"){
        let HelpStaffEmbed = new Discord.RichEmbed()
        .setTitle("**Les commandes sont :**")
        .setDescription("**Toutes les commandes ne sont faisable qu'avec les permissions des grades Modérateur, Administrateur et Fondateur (sauf la commande s!help staff) !**")
        .addField("**s!warn :**", "**Warn une personne demandé.**")
        .addField("**s!unwarn :**", "**Enlève le dernier warn d'une personne demandé**")
        .addField("**s!mute :**", "**Mute une personne demandé.**")
        .addField("**s!unmute :**", "**Enlève le mute d'une personne.**")
        .addField("**s!kick :**", "**Kick une personne demandé.**")
        .addField("**s!ban :**", "**Bannis une personne demandé.**")
        .addField("**s!say :**", "**Envoie le message demandé.**")
        .addField("**s!clear :**", "**Clear le nombre de message demandé (entre 1 et 99).**")
        .addField("**s!help staff :**", "**Envoie ce message .**")
        .setFooter("| Commande s!help staff |Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(HelpStaffEmbed)
    }

    if(!message.guild) return(MpEmbed)
    if(message.content === prefix + 'help roles') {
        let HelpRoles = new Discord.RichEmbed()
        .setTitle("**Les commandes de catégories d'ajout ou de retirement de rôles**")
        .addField('**s!help roles couleurs :**', "**Dit toutes le commandes d'ajout ou de retirement de rôles de couleurs.**")
        .setColor('#600303  ')
        message.channel.send(HelpRoles)
    }

    if(!message.guild) return(MpEmbed)
    if(message.content === prefix + 'help roles couleurs') {
        let HelpRolesCouleursEmbed = new Discord.RichEmbed()
    .setTitle('**Les commandes pour les rôles sont :**')
    .addField('**s!role add rouge :**', "**Vous donne le rôle 'rouge'.**")
    .addField('**s!role remove rouge :**', "**Vous retire le rôle 'rouge'.**")
    .addField('**s!role add bleu :**', "**Vous donne le rôle 'bleu'.**")
    .addField('**s!role remove bleu :**', "**Vous retire le rôle 'bleu'.**")
    .setColor('#600303')
    message.channel.send(HelpRolesCouleursEmbed)
    }   

    if(!message.guild) return
    if(message.content === prefix + "ping"){
        let PingEmbed = new Discord.RichEmbed()
        .setTitle("**Pong !**")
        .setFooter("| Commande s!ping | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(PingEmbed)
    }

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

    if(!message.guild) return
    if(message.content === prefix + "bienquifaitlemal"){
        let BienQuiFaitLeMalEmbed = new Discord.RichEmbed()
        .setTitle("**Les informations :**")
        .addField("**Pour les candidatures : <#638483117757431828>.**", "**Les membres ayant le rôle <@&637821572798873612> peuvent @here ou @everyone une fois par jours !**")
        .setFooter("Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(BienQuiFaitLeMalEmbed)
    }

    if(!message.guild) return
    if(message.content === prefix + "fonda"){
        let FondaEmbed = new Discord.RichEmbed()
        .setTitle("**Le fondateur est cette magnifique de personne qui est M - S#0246, c'est aussi cette même personne qui m'a créé !**")
        .setFooter("| Commande s!fonda | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(FondaEmbed)
    }

    if(!message.guild) return
    if(message.content === prefix + "fondateur"){
        let FondateurEmbed = new Discord.RichEmbed()
        .setTitle("**Le fondateur est cette magnifique de personne qui est M - S#0246, c'est aussi cette même personne qui m'a créé !**")
        .setFooter("| Commande s!fondateur |Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(FondateurEmbed)
    }

    if(!message.guild) return
    if(message.content === prefix + "admin"){
        let AdminEmbed = new Discord.RichEmbed()
        .setTitle("**Les administrateurs :**")
        .setDescription("**Aucun administrateurs pour le moment.**")
        .setFooter("| Commande s!admin | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(AdminEmbed)
    }

    if(!message.guild) return
    if(message.content === prefix + "administrateurs"){
        let AdministrateursEmbed = new Discord.RichEmbed()
        .setTitle("**Les administrateurs :**")
        .setDescription("**Aucun administrateurs pour le moment.**")
        .setFooter("| Commande s!administrateur | Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.channel.send(AdministrateursEmbed)
    }

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

    if(!message.guild) return
    if(message.content === prefix + "rappelle"){
        let RappelleEmbed = new Discord.RichEmbed()
        .setTitle("***N'oubliez pas de partager le serveur ! Au 100 membres (sans compter les bots), une surprise viendra !***")
        .setFooter("Serveur des démons | Samaël | Développé par M - S #0246 |")
        .setColor('#600303')
        message.delete()
        message.channel.send(RappelleEmbed)
    }

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

bot.on('message', message => {
    if(!message.guild) return
    if(message.content === prefix + 'ytdgzefuizgfuijduizhjdizhduiz') {
        let SondageEmbed = new Discord.RichEmbed()
        .setTitle('**Un salon sondage (pour vous poser des question du genre : pain au chocolat ou chocolatine) ?**')
        .setColor('#600303')
        .setFooter('| Suggestion | Serveur des démons | Samaël | Développé par M - S #0246 |')
        message.channel.send(SondageEmbed)
        .then(function (message) {
            message.react('👍')
            message.react('👎')
        })
        .catch(function() {
             });
    }

    if(!message.guild) return(MpEmbed)
    if(message.content === prefix + 'role add rouge') {
        const guildMember = message.member;
        let RoleRougeAjoutEmbed = new Discord.RichEmbed()
        .setTitle("**Le rôle 'rouge' vous à bien été ajouté.**")
        .setColor('#600303')
        .setFooter('| Rôle rouge ajout | Samaël | Serveur des démons | Développé par M - S#0246 |')
        if(!message.guild.channels.get('646387052757254165')) return(message.channel.send(MauvaisSalonRôlesEmbed))
        if(message.member.roles.has('646031707329527838')) return(message.channel.send(TuAsDéjàCeRôleEmbed))
        if(message.guild.channels.get('646387052757254165')) return(guildMember.addRole('646031707329527838'), message.channel.send(RoleRougeAjoutEmbed))
    }

    if(!message.guild) return(MpEmbed)
    if(message.content === prefix + 'role remove rouge') {
        const guildMember = message.member;
        let RoleRougeRetirementEmbed = new Discord.RichEmbed()
        .setTitle("**Le rôle 'rouge' vous à bien été retiré.**")
        .setColor('#600303')
        .setFooter('| Rôle rouge retirement | Samaël | Serveur des démons | Développé par M - S#0246 |')
        if(!message.guild.channels.get('646387052757254165')) return(message.channel.send(RoleRougeRetirementEmbed))
        if(!message.member.roles.has('646031707329527838')) return(message.channel.send(TuNAsPasCeRôleEmbed))
        if(message.guild.channels.get('646387052757254165')) return((guildMember.removeRole('646031707329527838')), message.channel.send(RoleRougeRetirementEmbed))
    }

    if(!message.guild) return(MpEmbed)
    if(message.content === prefix + 'role add bleu') {
        const guildMember = message.member;
        let RoleBleuAjoutEmbed = new Discord.RichEmbed()
        .setTitle("**Le rôle 'bleu' vous à bien été ajouté.**")
        .setColor('#600303')
        .setFooter('| Rôle bleu ajout | Samaël | Serveur des démons | Développé par M - S#0246 |')
        if(!message.guild.channels.get('646387052757254165')) return(message.channel.send(MauvaisSalonRôlesEmbed))
        if(message.member.roles.has('646394102878961664')) return(message.channel.send(TuAsDéjàCeRôleEmbed))
        if(message.guild.channels.get('646387052757254165')) return((guildMember.addRole('646394102878961664')), message.channel.send(RoleBleuAjoutEmbed))
    }

    if(message.content === prefix + 'date') {
        message.delete()
        var date = new Date();
        var semaine = new Array(7);
        semaine[1] = "Lundi";
        semaine[2] = "Mardi";
        semaine[3] = "Mercredi";
        semaine[4] = "Jeudi";
        semaine[5] = "Vendredi";
        semaine[6] = "Samedi";
        semaine[0] = "Dimanche";
        var jour = semaine[date.getDay()];
        let heure = date.getHours();
        let minutes = date.getMinutes();
        let seconde = date.getSeconds();
        var annee = new Array(12);
        annee[0] = 'Janvier';
        annee[1] = 'Février';
        annee[2] = 'Mars';
        annee[3] = 'Avril';
        annee[4] = 'Mai';
        annee[5] = 'Juin';
        annee[6] = 'Juillet';
        annee[7] = 'Août';
        annee[8] = 'Septembre';
        annee[9] = 'Octobre';
        annee[10] = 'Novembre';
        annee[11] = 'Décembre';
        var mois = annee[date.getMonth()];
        var année = date.getFullYear();
        let DateEmbed = new Discord.RichEmbed()
        .setTitle(`**Il est ${heure} heure, ${minutes} minutes, et ${seconde} secondes. Et nous sommes ${jour} en ${mois} ${année}.**`)
        .setColor('#600303')
        .setFooter('| Date | Serveur des démons | Samaël | Développé par M - S#0246')
        message.channel.send(DateEmbed)
    }

    if(!message.guild) return(MpEmbed)
    if(message.content === prefix + 'role remove bleu') {
        const guildMember = message.member; 
        let RoleBleuRetirementEmbed = new Discord.RichEmbed()
        .setTitle("**Le rôle 'Bleu' vous à bien été retiré.**")
        .setColor('#600303')
        .setFooter('| Rôle bleu retirement | Samaël | Serveur des démons | Développé par M - S#0246 |')
        if(!message.guild.channels.get('646387052757254165')) return(message.channel.send(MauvaisSalonRôlesEmbed))
        if(!message.member.roles.has('646394102878961664')) return(message.channel.send(TuNAsPasCeRôleEmbed))
        if(message.guild.channels.get('646387052757254165')) return((guildMember.removeRole('646394102878961664')), message.channem.send(RoleBleuRetirementEmbed))
    }

    {const guildMember = message.member;
        if(!message.guild) return(MpEmbed)
        if(guildMember) return(console.log(`@${message.author.username  } vient d'envoyer ce message : "${message}" dans #${message.channel.name}.`))
    }
});

bot.on('guildMemberAdd', member => {
    if(member.guild.id !== serveurStats.guildID) return;
    bot.channels.get(serveurStats.totalUsersID).setName(`Utilisateurs Total : ${member.guild.memberCount}`);
    bot.channels.get(serveurStats.memberCountID).setName(`Membres Total : ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serveurStats.botCountID).setName(`BOT Total : ${member.guild.members.filter(m => m.user.bot).size}`);
});

bot.on('guildMemberRemove', member => {
    if(member.guild.id !== serveurStats.guildID) return;
    bot.channels.get(serveurStats.totalUsersID).setName(`Utilisateurs Total : ${member.guild.memberCount}`);
    bot.channels.get(serveurStats.memberCountID).setName(`Membres Total : ${member.guild.members.filter(m => !m.user.bot).size}`);
    bot.channels.get(serveurStats.botCountID).setName(`BOT Total : ${member.guild.members.filter(m => m.user.bot).size}`);

});
