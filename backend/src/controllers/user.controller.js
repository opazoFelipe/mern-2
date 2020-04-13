const controller = {};

const User = require('../models/User.model');

controller.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

controller.getOneUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);   
    } catch (error) {
        res.status(500).json({status: `${error}`});
    }
};

controller.createUser = async (req, res) => {
    const { username } = req.body;
    try {
        const newUser = new User({username});
        await newUser.save();
        res.json({status: "Usuario Guardado"});
    } catch (error) {
        res.status(500).json({status: `${error}`});
    }  
};

controller.updateUser = async (req, res) => {
    const { username } = req.body;
    try {
        await User.findByIdAndUpdate(req.params.id, { username });
        res.json({status: "Usuario actualizado"});
    } catch (error) {
        res.status(500).json({status: `${error}`});
    }
};

controller.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({_id: req.params.id});
        res.json({status: "Usuario Eliminado"});
    } catch (error) {
        res.status(500).json({status: `${error}`});
    } 
};

module.exports = controller;