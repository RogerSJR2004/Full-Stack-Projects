const { QueryTypes } = require('sequelize');
const eventDB = require('../config/db');

// Get all enrollments (for reporting)
exports.getAllEnrolls = async (req, res) => {
    try {
        const enrolls = await eventDB.query('SELECT * FROM enrolls', {
            type: QueryTypes.SELECT
        });
        return res.json({ data: enrolls });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Error in fetching all enrollments" });
    }
};
