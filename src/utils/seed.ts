import connection from '../config/connection.js';
import { User, Thought } from '../models/index.js';
import { usersData } from './data.js';
// import { getRandomName, getRandomApplications } from './data.js';

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let applicationCheck = await connection.db?.listCollections({ name: 'applications' }).toArray();
  if (applicationCheck?.length) {
    await connection.dropCollection('applications');
  }
  
  let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
  if (userCheck?.length) {
    await connection.dropCollection('users');
  }

  const users: { username: string, email: string, thoughts: string[], friends: string[] } [] = [];
  const thoughts: { thoughtText: string, username: string, reactions: any[] }[] = [];
  usersData.forEach((user) => {
    users.push({
      email: user.email,
      username: user.username,
      thoughts: [],
      friends: [],
    });
  });

  await User.insertMany(users);
  await Thought.insertMany(thoughts);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
