const { User, Thought } = require("../models");

module.exports = {
  // Getting all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Getting single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Creating a user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Deleting a user and their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user found with that id" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and thoughts deleted." });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add friend
  async addFriend (req,res){
    try {
      const user = User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body} },
        {runValidators: true, new: true }
      )

      if(!user){
        return res.status(404).json({
          message: "No friend found with this id"
        })
      }
      res.json(user)
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //remove friend
  async removeFriend(req,res){
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.friendId},
        {$pull: { friends: {friendId: req.params.friendId}}}
      )
      if(!user){
        return res.status(404).json({
          message: 'No friend found with that id'
        })
      }
      res.json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }
};
