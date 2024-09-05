// seeds/seed.js
const mongoose = require('mongoose');
const { User, Thoughts } = require('../models'); // Adjust the path to your models folder
require('dotenv').config();

const users = [
  {
    username: 'lernantino',
    email: 'lernantino@gmail.com',
    thoughts: [], // thoughts to be populated later
    friends: []
  },
  {
    username: 'techguy',
    email: 'techguy@gmail.com',
    thoughts: [],
    friends: []
  },
];

const thoughts = [
  {
    thoughtText: 'The beacons are lit!',
    username: 'lernantino',
    reactions: [
      {
        reactionBody: 'Gondor calls for Rohan!',
        username: 'techguy',
        reactionId: new mongoose.Types.ObjectId()
      }
    ]
  },
  {
    thoughtText: 'There was was a merry man...',
    username: 'techguy',
    reactions: [
      {
        reactionBody: 'What happened to him?',
        username: 'lernantino',
        reactionId: new mongoose.Types.ObjectId()

      }
    ]
  },
];

// connect to the database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mongo_blog', {});

// seed it
const seedDatabase = async () => {
  try {
    // clears data upon startup
    await User.deleteMany({});
    await Thoughts.deleteMany({});

    // create users
    const createdUsers = await User.insertMany(users);

    // create thoughts and associate with users
    const createdThoughts = await Promise.all(
      thoughts.map(async (thought) => {
        const newThought = await Thoughts.create(thought);
        
        // update user
        await User.findOneAndUpdate(
          { username: thought.username },
          { $push: { thoughts: newThought._id } }
        );

        return newThought;
      })
    );

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

// run the seed function
seedDatabase();
