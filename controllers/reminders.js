const Reminders = require('../models/reminders');
const {Op} = require('sequelize');

const createReminder = async function(req, res, next) {
    const user = req.body.user ? req.body.user : "";
    const description = req.body.description ? req.body.description : "";
    const date = req.body.date ? req.body.date : new Date();

    const newReminder = new Object();
    newReminder.user = user;
    newReminder.description = description;
    newReminder.date = new Date(date);

    const reminder = await Reminders.create(newReminder).then(res => {
        return res.get();
    }).catch(err => {
        console.log(err);
        return null;
    });
    return res.status(201).json(reminder);
}

const getReminders = async function(req, res, next) {
    var user = req.query.user;
    var after = req.query.after;

    var query = new Object();
    if (user !== undefined) query.user = user;
    if (after !== undefined) {
        query = {
            ...query,
            date: { [Op.gte] : new Date(Number(after)) }
        };
    }

    const reminders = await Reminders.findAll({
        where: query,
    });
    return res.status(200).json(reminders);
}

const getReminderById = async function(req, res, next) {
    var id = req.id;
    if (id === null) return res.status(404).send('ID not found');

    const reminder = await Reminders.findOne({
        where: {id: id}
    });
    if (reminder === null) return res.status(404).send('ID not found');
    return res.status(200).json(reminder);
}

module.exports = {
    createReminder,
    getReminders,
    getReminderById,
}
