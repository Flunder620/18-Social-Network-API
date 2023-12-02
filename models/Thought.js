const { Schema, Types, model } = require("mongoose");

const dayjs = require("dayjs");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max_length: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length: 1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("formattedDate").get(function () {
  //used dayjs to format date
  const formattedDate = dayjs(this.createdAt).format("MM/DD/YYYY");
  return formattedDate;
});

//thought getter
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
//reaction gettter
reactionSchema.virtual("reactionFormattedDate").get(function () {
  const reactionFormattedDate = dayjs(this.createdAt).format("MM/DD/YYYY");
  return reactionFormattedDate;
})

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
