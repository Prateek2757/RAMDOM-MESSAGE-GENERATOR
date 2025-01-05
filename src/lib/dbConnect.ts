import mongoose from 'mongoose';

export async function connect() {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error("MongoDB URI is missing. Please set MONGO_URI in your .env.local file.");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        });

    } catch (error) {
        console.error('Something went wrong during MongoDB connection.');
        console.error(error);
    }
}
