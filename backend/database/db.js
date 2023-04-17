import mongoose from "mongoose";

async function connect(){

    const getUri = mongodb.getUri();

    mongoose.set('strictQuery',true);

    const db = await mongoose.connect(getUri);
    console.log('database connected');
    return db;

}

export default connect;