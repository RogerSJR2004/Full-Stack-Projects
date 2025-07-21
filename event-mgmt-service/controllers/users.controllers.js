const eventDB = require('../config/db');
const usersTbl = require('../models/users.model')(eventDB);

// List all users
exports.list = async (req, res) => {
    try {
        const result = await usersTbl.findAll();
        return res.json({ data: result });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Error in user list" });
    }
};

// Get a specific user by ID
exports.getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await usersTbl.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json({ data: user });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Error in fetching user" });
    }
};

// Update a specific user by ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    try {
        const user = await usersTbl.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        await user.update(updateData);
        return res.json({ message: "User updated successfully", data: user });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Error in updating user" });
    }
}; 