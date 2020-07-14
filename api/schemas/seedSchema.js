import mongoose from 'mongoose';

const { ObjectId, Schema } = mongoose;
const SeedSchema = new Schema({
  id: ObjectId,
  seed: String
});

export default SeedSchema;
