const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost:27017/keyrent', { useNewUrlParser: true })

const userSchema = Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true },
    type: { type: Number, required: true },
    password: { type: String, required: true },
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
});

const flatSchema = Schema({
    address: { type: String, required: true },
    floor: { type: String, required: true },
    image: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    price: { type: Number, required: true },
    request: [{ type: Object }],
    rentor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    desc: String
});


const User = mongoose.model('User', userSchema)
const Flat = mongoose.model('Flat', flatSchema)


module.exports = { User, Flat }