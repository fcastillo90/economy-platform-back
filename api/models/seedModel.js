import mongoose from 'mongoose';
import seedSchema from '../schemas/seedSchema';

seedSchema.statics = {
  get: function async({ FIND, SORT, LIMIT, SKIP }) {
    return this.find(FIND)
      .sort(SORT)
      .limit(LIMIT)
      .skip(SKIP);
  },
  count: function async({ FIND }) {
    return this.countDocuments(FIND);
  }
};

const seedModel = mongoose.model('Seed', seedSchema, 'seed');
export default seedModel;
