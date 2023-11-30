const { Schema, model } = require("mongoose");
const { Thought } = require(".");
const dayjs = require("dayjs");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      
    }
  }
)

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
    reactions: [reactionSchema]
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

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});


const Thought = model("thought", thoughtSchema);

module.exports = Thought;
