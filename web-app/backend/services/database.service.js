const User = require('../models/user.model');

exports.userRegistration = async function(username, password) {
    try {
        const user = new User({username, password});
        await user.save();
    } catch (err) {
        throw new Error(`Error al registrar al usuario ${username} en la base de datos. ${err}`);
    }  
}

exports.getUser = async function(username) {
    try {
        const user = await User.findOne({ username }).exec();
        if (!user) {
            throw new Error("No se encontró ningún usuario con el nombre provisto.");
        }
        return user;
    } catch (err) {
        throw new Error(`Fallo al obtener el usuario: ${err}`);
    }
}