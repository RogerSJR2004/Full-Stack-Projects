const eventDB = require('../config/db');
const enrollsTbl = require('../models/enrolls.model')(eventDB);

// Add (enroll a user in an event)
exports.add = async (req, res) => {
    const { eventId } = req.params;
    const { userId, status } = req.body; 

    // Input validation
    if (!userId) {
        return res.status(400).json({ error: "userId is required" });
    }
    if (!eventId) {
        return res.status(400).json({ error: "eventId is required" });
    }

    try {
        // Check for duplicate enrollment
        const existing = await enrollsTbl.findOne({ where: { event_id: eventId, user_id: userId } });
        if (existing) {
            return res.status(409).json({ error: "User already enrolled in this event" });
        }
        let result = await enrollsTbl.create({
            event_id: eventId,
            user_id: userId,
            status // include other fields as needed
        });
        return res.status(201).json({ message: "Enrollment created successfully", data: result });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Error in enrollment creation" });
    }
};

// List all enrollments for an event
exports.list = async (req, res) => {
    const { eventId } = req.params;
    if (!eventId) {
        return res.status(400).json({ error: "eventId is required" });
    }
    try {
        const result = await enrollsTbl.findAll({ where: { event_id: eventId } });
        return res.json({ data: result });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Error in enrollment list" });
    }
};

// Get a specific enrollment
exports.getEnroll = async (req, res) => {
    const { eventId, enrollId } = req.params;
    if (!eventId || !enrollId) {
        return res.status(400).json({ error: "eventId and enrollId are required" });
    }
    try {
        const enroll = await enrollsTbl.findOne({ where: { id: enrollId, event_id: eventId } });
        if (!enroll) {
            return res.status(404).json({ error: "Enrollment not found" });
        }
        return res.json({ data: enroll });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Error in fetching enrollment" });
    }
};

// Update a specific enrollment
exports.updateEnroll = async (req, res) => {
    const { eventId, enrollId } = req.params;
    const { userId, status } = req.body; // Add all needed fields
    if (!eventId || !enrollId) {
        return res.status(400).json({ error: "eventId and enrollId are required" });
    }
    try {
        const enroll = await enrollsTbl.findOne({ where: { id: enrollId, event_id: eventId } });
        if (!enroll) {
            return res.status(404).json({ error: "Enrollment not found" });
        }
        await enroll.update({
            user_id: userId ?? enroll.user_id,
            status: status ?? enroll.status
            // Add other fields here
        });
        return res.json({ message: "Enrollment updated successfully", data: enroll });
    } catch (err) {
        console.log("err", err);
        return res.status(500).json({ error: "Error in updating enrollment" });
    }
}; 