import mongoose from 'mongoose';

const connection = {};

async function connect() {
  if (connection.isConnection) {
    console.log('Already Connected!');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnection = mongoose.connections[0].readyState;
    if (connection.isConnection === 1) {
      console.log('Use previous connection.');
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);
  console.log('New Connection!');
  connection.isConnection = db.connections[0].readyState;
}

async function disconnect() {
  if (connection.isConnection) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnection = false;
    } else {
      console.log('Not Disconnected');
    }
  }
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
