const {MongoClient} = require('mongodb')
const ObjectId = require('mongodb').ObjectId

const URL = 'mongodb://127.0.0.1:27017/'
const mongoClient = new MongoClient(URL)

function Timetable(_id, name, time, tutor, room) {
    this._id = _id
    this.name = name
    this.time = time
    this.tutor = tutor
    this.room = room
}

async function findAll() {
    let res = []

    try {
        await mongoClient.connect()
        const db = mongoClient.db("timetable")
        const collection = db.collection("classes")
        res = await collection.find().toArray()
    } catch (err) {
        console.log(err)
    } finally {
        await mongoClient.close()
    }

    return res
}

async function findById(id) {
    let res = null

    try {
        await mongoClient.connect()
        const db = mongoClient.db("timetable")
        const collection = db.collection("classes")
        res = await collection.findOne({'_id': new ObjectId(id)})
    } catch (err) {
        console.log(err)
    } finally {
        await mongoClient.close()
    }

    return res
}

async function update(item) {
    try {
        await mongoClient.connect()
        const db = mongoClient.db("timetable")
        const collection = db.collection("classes")
        await collection.findOneAndUpdate({'_id': new ObjectId(item._id)},
            {$set: {name: item.name, time: item.time, tutor: item.tutor, room: item.room}})
    } catch (err) {
        console.log(err)
    } finally {
        await mongoClient.close()
    }
}

async function remove(id) {
    try {
        await mongoClient.connect()
        const db = mongoClient.db("timetable")
        const collection = db.collection("classes")
        await collection.deleteOne({_id: new ObjectId(id)})
    } catch (err) {
        console.log(err)
    } finally {
        await mongoClient.close()
    }
}

async function add(item) {
    try {
        await mongoClient.connect()
        const db = mongoClient.db("timetable")
        const collection = db.collection("classes")
        await collection.insertOne(item)
    } catch (err) {
        console.log(err)
    } finally {
        await mongoClient.close()
    }
}


module.exports = {
    Timetable: Timetable,
    findAllClasses: findAll,
    findClassById: findById,
    updateClass: update,
    removeClass: remove,
    addClass: add
}



