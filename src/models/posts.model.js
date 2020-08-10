const mongoose = require('mongoose');

const { Schema } = mongoose;

const Status = Object.freeze({
  active: 'active',
  inactive: 'inactive',
  deleted: 'deleted',
});

const PostSchema = new Schema(
  {
    userId: {
      type: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    content: {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

Object.assign(PostSchema.statics, { Status });

module.exports = mongoose.model(
  'Post',
  PostSchema,
  'posts',
);
