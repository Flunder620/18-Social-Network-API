const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //Get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.Thought });

      if (!thought) {
        res.status(404), json({ message: "No thought found with this id" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created but no user was found with that id",
        });
      }

      res.json("Thought created");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Updating a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //deleting a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id" });
      }
      const user = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought updated but no user found with this id",
        });
      }

      res.json({
        message: "Thought updated",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Adding a reaction
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No thought found with this id",
        });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Removing a reaction
  async removeReaction(req,res) {
    try{
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: {reactionId:req.params.reactionId}}},
            { runValidators: true, new: true}
        )
        if(!thought){
            return res.status(404).json({
                message: 'No thought found with that id'
            })
        }
        res.json(thought)
    }catch (err){
        res.status(500).json(err)
    }
  }
};
