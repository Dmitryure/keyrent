const mongoose = require('mongoose')

async function saveToDb(model, args){
    let saving = new model({...args})
    await saving.save()
}

module.exports = saveToDb