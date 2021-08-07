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
                    title: "💸 VENDA REALIZADA 💸",
                    description: `🔰 VENDEDOR - ${author} \n 
                    🕵️ COMPRADOR - ${comprador} \
                    \n⚖️ QUANTIDADE - ${quantidade} \
                    \n💰 VALOR DA COMPRA - ${valor} \
                    \n📍 SUJO ou LIMPO - ${dinheiro} \n\n`,
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
                    title: "🏡 NOVO MORADOR 🏡",
                    description: `🔸 FICHA FEITA POR ${author} \n 
                    🏘️MORADOR - ${nome} \
                    \n📱 TELEFONE ${telefone} \
                    \n🎟️ PASSAPORTE - ${passaporte}\n\n`,
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
                    title: "💳 CONTROLE DE METAS 💳",
                    description: `\n🏘️ MORADOR - ${morador} \n \
                    \n🎟️ PASSAPORTE - ${passaporte} \
                    \n📱 DESTINATÁRIO - ${destinatario} \
                    \n📉 META - ${meta}`,
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
                        msgChannel.send('Consigo apagar até 100 mensagens!')
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
                    title: "📥 BAÚ 📥",
                    description: `\n 🟢 ITEM ADICIONADO 🟢 \n \
                    \n🏘️ MEMBRO - ${author} \
                    \n🛒 ITEM - ${item} \
                    \n⚖️ QUANTIDADE - ${quantidade}`,
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
                    title: "📤 BAÚ 📤",
                    description: `\n 🔴 ITEM REMOVIDO 🔴 \n \
                    \n 🏘️ MEMBRO - ${author} \
                    \n🛒 ITEM - ${item} \
                    \n⚖️ QUANTIDADE - ${quantidade}`,
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