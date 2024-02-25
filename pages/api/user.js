import {
    connectToDatabase
} from '../../lib/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    try {
        // Use the database middleware
        await database(req, res);

        console.log('Received request:', req.body);

        if (req.method === 'POST') {
            const {
                username,
                email,
                phoneNumber,
                password
            } = req.body;

            // Validation: Check if required fields are present
            if (!username || !email || !phoneNumber || !password) {
                return res.status(400).json({
                    error: 'Missing required fields'
                });
            }

            // Connect to MongoDB
            const {
                db
            } = await connectToDatabase(); // Corrected import

            // Check if the user already exists (you may customize this logic)
            const existingUser = await db.collection('users').findOne({
                email
            });

            if (existingUser) {
                return res.status(409).json({
                    error: 'User with this email already exists'
                });
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            await db.collection('users').insertOne({
                username,
                email,
                phoneNumber,
                password: hashedPassword,
            });

            res.status(201).json({
                message: 'User registered successfully'
            });
        } else {
            // Handle other HTTP methods
            res.status(405).json({
                message: 'Method Not Allowed'
            });
        }
    } catch (error) {
        console.error('Error in API route:', error);
        res.status(500).json({
            error: 'Internal Server Error'
        });
    }
}
