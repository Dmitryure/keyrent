const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/keyrent', { useNewUrlParser: true })

const userSchema = Schema({
    name: String,
    surname: String,
    email: { type: String, unique: true },
    type: String,
    password: String,
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})



const flatSchema = Schema({
    address: String,
    floor: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    price: Number,
    request: { type: Schema.Types.ObjectId, ref: 'Request' },
    rentor: { type: Schema.Types.ObjectId, ref: 'User' },
})

const requestSchema = Schema({
    type: String,
    body: String,
    completed: Boolean
})

const User = mongoose.model('User', userSchema)
const Flat = mongoose.model('Flat', flatSchema)
const Request = mongoose.model('Request', requestSchema)

module.exports = { User, Flat, Request }