const { Role, Message } = require("discord.js");

const channelRegras = "regras"
const channelGames = "jogos"

class EmojiManager {
    constructor(guild) {
        this.guild = guild;

        this.gamesRole = {
            'valorant_logo' : ['ValorantPlayer', 'COMPETIDOR'],
            'lol_logo' : ['LOLPlayer', 'COMPETIDOR'],
            'tft_logo' : ['TFTPlayer', 'COMPETIDOR'],
        }

        this.rules = this.guild.channels.cache.find(channel => channel.name == channelRegras)
        this.games = this.guild.channels.cache.find(channel => channel.name == channelGames)

        this.channelHandler = {
            [this.rules.id]: (props) => {
                if (props.emojiInfo.name == "✅") {
                    if (props.action == "MESSAGE_REACTION_ADD") {
                        this.addRolesToMember(props.member, ['✔️'])
                    } else if (props.action == "MESSAGE_REACTION_REMOVE"){
                        this.removeRolesFromMember(props.member, ['✔️'])
                    }
                }
            },    
            [this.games.id]: (props) => {
                if (props.action == "MESSAGE_REACTION_ADD") {
                    this.addRolesToMember(props.member, this.gamesRole[props.emojiInfo.name])
                } else if (props.action == "MESSAGE_REACTION_REMOVE"){
                    this.removeRolesFromMember(props.member, this.gamesRole[props.emojiInfo.name])
                }
            },
        }
    }

    addRolesToMember(member, roles) {
        try {
            roles.forEach(role => {
                member.roles.add(this.guild.roles.cache.find(gRole => gRole.name == role))
            });
        } catch (err) {}
    }

    removeRolesFromMember(member, roles) {
        try {
            roles.forEach(role => {
                member.roles.remove(this.guild.roles.cache.find(gRole => gRole.name == role))
            });
        } catch (err) {}
    }
        

    throwData(info) {
        let member = this.guild.members.cache.get(info.d.user_id);

        try {
            this.channelHandler[info.d.channel_id]({
                member, 
                action: info.t, 
                emojiInfo: info.d.emoji
            })
        } catch (err) {

        }
    }
}

module.exports = EmojiManager;