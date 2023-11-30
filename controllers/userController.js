const { User, Thought } = require ('../models');

module.exports = {
    // Getting all users
    async getUsers (req,res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Getting single user
    async getSingleUser(req,res) {
        try {
            const user = await User.findOne({ _id: req.params.userid})
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message:'No user found with that id'})
            }
            res.json(user)
        } catch (err){
            res.status(500).json(err)
        }
    },
    // Creating a user
    async createUser(req, res) {
        try{
            const user = await User.create(req.body);
            res.json(user);
        } catch (err){
            res.statis(500).json(err);
        }
    },
    // Update a user
    // async updateUser (req,res) {
    //     try{

    //     }
    // },
    // Deleting a user and their thoughts
    async deleteUser (req,res) {
        try{
            const user = await User.findOneAndDelete({ _id: req.parmas.userId})
        }
    }
}