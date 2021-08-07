//const EmojiManager = require('./EmojiManager.js')
const MessagesManager = require('./MessageManager.js')

class ServidorMain {
    constructor(guild) {
      this.guild = guild;

      this.creationChannels = {}
      
      this.messagesManager= new MessagesManager(this.guild);
      //this.emojiManager = new EmojiManager(this.guild);
    }

    throwMsg(msg) {
          this.messagesManager.throwMessages(msg);

          if (this.creationChannels[msg.channel.id] != undefined) {
            this.creationChannels[msg.channel.id].throwMessage(msg.content);
            return;
          }
      }

    throwReaction(data) {
      this.emojiManager.throwData(data);
    }
}


module.exports = ServidorMain;