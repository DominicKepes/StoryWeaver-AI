const db = require('../config/connection');
const User = require('../models/user');
const userSeeds = require('./userSeeds.json'); // Import userSeeds directly

const cleanDB = require('./cleanDB');

console.log('db:', db);
console.log('User model:', User);
console.log('userSeeds data:', userSeeds);

db.once('open', async () => {
    try {
        // Clean existing User data
        await cleanDB('User', 'users');

        // Seed User data
        await User.create(userSeeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
});
