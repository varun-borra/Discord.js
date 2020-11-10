const Discord = require('discord.js');
const client = new Discord.Client();

//token
const config = require('./roe-bot.json')
const {prefix} = require('./roe-bot.json')
//commands
const command = require('./commands/command')
const poll = require('./commands/poll')
//bot get ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

   
//command test
command(client, ['ping', 'test'], (message) => {
  message.channel.send('Pong!')
})

     

//!help command
command(client, 'help', (message) => {
    message.channel.send(`These are my supported commands:
                         **!help** - Displays the help menu
                         **!add <num1> <num2>** - Adds two numbers
                         **!sub <num1> <num2>** - Subtracts two numbers`)
})


                            /* command related to 1.!server status and bot 2.!status */

                                            /*server members status using => !servers*/

command(client, 'servers', (message) => {
 client.guilds.cache.forEach((guild) => {
  message.channel.send( `${guild.name} has a total of ${guild.memberCount} members`)
  })
})

                          /* "!status hello world" -> "hello world" to change bot status using => !status your choice*/

command(client, 'status', (message) => {
 const content = message.content.replace('!status ', '')
  client.user.setPresence({
   activity: {
   name: content,
   type: 0,
   },
  })
})

                           /* 3.Poll,4.BulkDelete,5.Ban,6.kick command */

  /*  automatically react with a thumbs up and down emojis in specific channels. This is mostly helpful in suggestions or ideas channels and helps your community provide feedback in an easy way. */

poll(client)                        

                                   /*BulkDelete using => !cc or !clearchannel */
command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
     message.channel.messages.fetch().then((results) => {
     message.channel.bulkDelete(results)
     })
    }
   })
                               


                          /*Ban a member from channel using => !ban */


command(client, 'ban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} That user has been`)
      } else {
        message.channel.send(`${tag} Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

                                     /*kick a member from channel using => !kick */
  
  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} That user has kicked`)
      } else {
        message.channel.send(`${tag} Please specify someone to kick.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

                                              /* 7.createtextchannel, 8.createvoicechannel */

                                            /*createtextchannel using => !createtextchannel */
  
command(client, 'createtextchannel', (message) => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    const name = message.content.replace('!createtextchannel ', '')
    message.guild.channels
    .create(name, {
    type: 'text',
    })
    //create a channel in a category
    .then((channel) => {
    channel.setParent(config.categoryId) //<-- categoryId in reo-bot.json
    })
  }
})
                                             /*createvoicechannel using => !createvoicechannel */

command(client, 'createvoicechannel', (message) => {  
  if (message.member.hasPermission('ADMINISTRATOR')) {
  const name = message.content.replace('!createvoicechannel ', '')
  message.guild.channels
      .create(name, {
      type: 'voice',
      })
      //create a channel in a category
      .then((channel) => {
        channel.setParent(config.categoryId)
        //limit --> (10 limit)
        channel.setUserLimit(10)
      })
  }    
  
})


 
  
  /* embed */

  command(client, 'embed', (message) => {
    const logo =
      'https://cdn.dribbble.com/users/411475/screenshots/14542250/media/4599bd4c20a9c9afb9c74cf7c38639bc.jpg'

    const embed = new Discord.MessageEmbed()
      .setTitle('Example text embed')
      .setURL('https://cdn.dribbble.com/users/411475/screenshots/14542250/media/4599bd4c20a9c9afb9c74cf7c38639bc.jpg')
      .setAuthor(message.author.username)
      .setImage(logo)
      .setThumbnail(logo)
      .setFooter('This is a footer')
      .setColor('#00AAFF')
      .addFields(
        {
          name: 'Field 1',
          value: 'Hello world',
          inline: true,
        },
        {
          name: 'Field 2',
          value: 'Hello world',
          inline: true,
        },
        {
          name: 'Field 3',
          value: 'Hello world',
          inline: true,
        },
        {
          name: 'Field 4',
          value: 'Hello world',
        }
      )

    message.channel.send(embed)
  })
 
  
});


client.login(config.token);
