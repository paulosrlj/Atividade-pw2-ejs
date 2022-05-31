const Message = require('../models/message');
const db = require('../config/db.config');

// exports.messageList = async() => {
//     try {
//         const mensagens = await db.message.findAll();
//         return mensagens;
//     } catch(err) {
//         console.log(err);
//     }
// }

exports.getAll = async (req, res, next) => {
    try {
      const ALL = await Message.findAll();
      return res.status(200).json(ALL);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  
  exports.getOne = async (req, res, next) => {
    try {
      const message = await Message.findByPk(req.params.id);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  
  exports.createOne = async (req, res, next) => {
    try {
      const MESSAGE_MODEL = {
          title: req.body.title,
          content: req.body.content,
      };
  
      try {
        const message = await Message.create(MESSAGE_MODEL);
        console.log('Message crerated');
        return res.status(201).json(Message);
      } catch (error) {
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  
  exports.updateOne = async (req, res, next) => {
    try {
      const MESSAGE_MODEL = {
        title: req.body.title,
        content: req.body.content,
      };
  
      try {
        const message = await Message.update(MESSAGE_MODEL, { where: { id: req.params.id } });
        return res.status(200).json(message);
      } catch (error) {}
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  
  exports.deleteOne = async (req, res, next) => {
    try {
      const message = await Message.destroy({ where: { id: req.params.id } });
      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

//exports.getMessage = async(id) => {
//};
