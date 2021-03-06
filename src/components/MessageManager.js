const { Guild, Channel } = require("discord.js");

class MessagesManager {
    constructor(guild){
        this.guild = guild
        
        this.commands = {
            '.venda' : (msg, channel, author) => {
                msg.splice(0, 1);

                let quantidade = msg[0]
                parseInt(quantidade)
                msg.splice(0, 1);

                let valor = msg[0]
                parseFloat(valor)
                msg.splice(0, 1);

                let dinheiro = msg[0]
                msg.splice(0, 1);

                let comprador = msg
                comprador = comprador.join(" ")

                //!venda [quantidade] [valor] [limpo ou sujo] [nome do comprador]

                this.guild.channels.cache.get(channel).send({embed: {
                    color: "#FFFF00",
                    title: "šø VENDA REALIZADA šø",
                    description: `š° VENDEDOR - ${author} \n 
                    šµļø COMPRADOR - ${comprador} \
                    \nāļø QUANTIDADE - ${quantidade} \
                    \nš° VALOR DA COMPRA - ${valor} \
                    \nš SUJO ou LIMPO - ${dinheiro} \n\n`,
                    timestamp: new Date(),
                    footer: {
                        text: '.venda [quantidade] [valor] [limpo ou sujo] [nome do comprador]',
                    },
                }})
            },
            '.morador' : (msg, channel, author) => {
                msg.splice(0, 1);

                let telefone = msg[0]
                parseInt(telefone)

                msg.splice(0, 1);
                let passaporte = msg[0]
                parseInt(passaporte)

                msg.splice(0, 1);
                let nome = msg
                nome = nome.join(" ");

                this.guild.channels.cache.get(channel).send({embed: {
                    color: "#FFFF00",
                    title: "š” NOVO MORADOR š”",
                    description: `šø FICHA FEITA POR ${author} \n 
                    šļøMORADOR - ${nome} \
                    \nš± TELEFONE ${telefone} \
                    \nšļø PASSAPORTE - ${passaporte}\n\n`,
                    timestamp: new Date(),
                    footer: {
                        text: '.morador [tele-fone] [passaporte] [nome]',
                    },
                }})
            },
            '.metas' : (msg, channel, author) => {
                msg.splice(0, 1);

                let meta = msg[0]
                msg.splice(0, 1);

                let message = msg[0]
                let destinatario = message.substring(3)
                destinatario = destinatario.substring(18,0)
                destinatario = this.guild.members.cache.get(destinatario)
                if (destinatario == undefined) {
                    destinatario = msg[0]
                }
                msg.splice(0, 1);

                let passaporte = msg[0]
                parseInt(passaporte)
                msg.splice(0, 1);

                let morador = msg
                morador = morador.join(" ")

                this.guild.channels.cache.get(channel).send({embed: {
                    color: "#FFFF00",
                    title: "š³ CONTROLE DE METAS š³",
                    description: `\nšļø MORADOR - ${morador} \n \
                    \nšļø PASSAPORTE - ${passaporte} \
                    \nš± DESTINATĆRIO - ${destinatario} \
                    \nš META - ${meta}`,
                    timestamp: new Date(),
                    footer: {
                        text: '.metas [meta] [destinatario] [passaporte] [nome do morador]',
                    },
                }})
            },
            '.clear' : (msg, channel, author) => {
                console.log('teste')
                let membro = this.guild.members.cache.get(author.id)
                
                if (membro.hasPermission('ADMINISTRATOR')) {
                    let msgChannel = guild.channels.cache.find(rChannel => rChannel.id == channel)
                    let qtdMsg = parseInt(msg[1])

                    if (qtdMsg == undefined) return

                    if (qtdMsg > 100) {
                        msgChannel.send('Consigo apagar atĆ© 100 mensagens!')
                        return
                    } else {  
                        msgChannel.bulkDelete(qtdMsg)
                    }
                }
            },
            '.a' : (msg, channel, author) => {
                msg.splice(0, 1);

                let quantidade = msg[0]
                parseInt(quantidade)
                msg.splice(0, 1);

                let item = msg

                this.guild.channels.cache.get(channel).send({embed: {
                    color: "#FFFF00",
                    title: "š„ BAĆ š„",
                    description: `\n š¢ ITEM ADICIONADO š¢ \n \
                    \nšļø MEMBRO - ${author} \
                    \nš ITEM - ${item} \
                    \nāļø QUANTIDADE - ${quantidade}`,
                    timestamp: new Date(),
                    footer: {
                        text: '.a [quantidade] [item]',
                    },
                }})
            },
            '.b' : (msg, channel, author) => {
                msg.splice(0, 1);

                let quantidade = msg[0]
                parseInt(quantidade)
                msg.splice(0, 1);

                let item = msg

                this.guild.channels.cache.get(channel).send({embed: {
                    color: "#FFFF00",
                    title: "š¤ BAĆ š¤",
                    description: `\n š“ ITEM REMOVIDO š“ \n \
                    \n šļø MEMBRO - ${author} \
                    \nš ITEM - ${item} \
                    \nāļø QUANTIDADE - ${quantidade}`,
                    timestamp: new Date(),
                    footer: {
                        text: '.b [quantidade] [item]',
                    },
                }})
            }
        }
    }

    throwMessages(msg){
        try {
            let author = msg.author
            let channel
            let data = msg.content.split(" ");
            if (this.commands[data[0]]){
                channel = msg.channel.id
            }
            this.commands[data[0]](data, channel, author);
            msg.delete()
        } catch (err) {
        }
    }
}

module.exports = MessagesManager;