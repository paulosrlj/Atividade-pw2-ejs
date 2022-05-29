const db = require('../config/db.config');

exports.messageList = async() => {
    try {
        const mensagens = await db.message.findAll();
        return mensagens;
    } catch(err) {
        console.log(err);
    }
}

//exports.getMessage = async(id) => {
//};
