import {
    MongoClient
} from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your MongoDB URI to the .env.local file');
}

if (process.env.NODE_ENV === 'development') {
    if (!clientPromise) {
        clientPromise = MongoClient.connect(uri, options);
    }
}

export default async function database(req, res, next) {
    try {
        if (!client) {
            client = await clientPromise;
        }
        req.dbClient = client;
        req.db = client.db('your-database-name');

        // If next is a function, call it
        if (typeof next === 'function') {
            return next();
        }
    } catch (error) {
        console.error('Error connecting to the database:', error);
        return res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}
