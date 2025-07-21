const { QueryTypes, DataTypes, Sequelize } = require('sequelize');
const eventDB = require('../config/db');
const eventsTbl = require("../models/events.model") (eventDB)


exports.add = async(req, res) =>{
      console.log("req.body", req.body);
      const {
        eventName,
        eventDescription,
        eventDate,
        eventLocation,
        eventLink,
        eventVideoLink,
        eventImageLink,
        publishFrom,
        publishTo,
        status
      } = req.body;


      try{
        let result = await eventsTbl.create({
            event_name : eventName,
            event_description : eventDescription,
            event_date : eventDate || null,
            event_location : eventLocation,
            event_link : eventLink,
            event_video_link : eventVideoLink,
            event_image_link : eventImageLink,
            publish_from : publishFrom,
            publish_to : publishTo,
            status:status??1
        })
        console.log("event creation",result);
        return res.send("Event Created successfully")
      }
      catch(err){
        console.log("err",err)
        return res.status(504).send("Error in event creation")
      }
}
exports.list = async (req, res) =>{
    try{
        const result = await eventsTbl.findAll();
        return res.json(result);
    }
    catch(err){
        console.log("err",err)
        return res.status(504).send("Error in event list")
    }
}

exports.getEvent = async (req, res) =>{
    const { id } = req.params;
    try{
        const event = await eventsTbl.findByPk(id);
        if (!event) {
            return res.status(404).send("Event not found");
        }
        return res.json(event);
    }
    catch(err){
        console.log("err",err)
        return res.status(504).send("Error in fetching event")
    }
}

exports.updateEvent = async (req, res) =>{
    const { id } = req.params;
    const {
        eventName,
        eventDescription,
        eventDate,
        eventLocation,
        eventLink,
        eventVideoLink,
        eventImageLink,
        publishFrom,
        publishTo,
        status
    } = req.body;
    try{
        const event = await eventsTbl.findByPk(id);
        if (!event) {
            return res.status(404).send("Event not found");
        }
        await event.update({
            event_name : eventName,
            event_description : eventDescription,
            event_date : eventDate || null,
            event_location : eventLocation,
            event_link : eventLink,
            event_video_link : eventVideoLink,
            event_image_link : eventImageLink,
            publish_from : publishFrom,
            publish_to : publishTo,
            status: status ?? event.status
        });
        return res.send("Event updated successfully");
    }
    catch(err){
        console.log("err",err)
        return res.status(504).send("Error in updating event")
    }
}