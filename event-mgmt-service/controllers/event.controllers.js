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
        // const now = new Date();
        // const availableEvents = (Array.isArray(data) ? data : data.events || []).filter(event => {
        //     const eventDate = new Date(event.event_date);
        //     return (
        //         (event.status === 1 || event.status === 'active') &&
        //         eventDate >= now
        //     );
        // });
        const result = await eventsTbl.findAll({
            attributes: ['id','event_name','event_description','event_date','event_location','event_link','event_video_link','event_image_link','publish_from','publish_to','status'],
            // where: {
            //     status: 1,
            //     publish_from: {
            //         [Op.lte]: now
            //     },
            //     publish_to: {
            //         [Op.gte]: now
            //     }
            // }
        });

        // list all events
        console.log("event >>> list", result);
        return res.send(result);
//         for (let i=0;i<result.length;i++) // to get sepecific data from the table
// {
//     console.log("event >>> list",i, result[i].event_name);

// }   
//         // Return the event names in an array under the key "Event Name"
//         const eventNames = result.map(event => event.event_name);
//         return res.status(200).json({ "Event Name": eventNames });
        
        // console.log("event >>> list",result);
        // return res.status(200).json (result) // -> or we can use this to make that in array {eventList:result}
    } // --> array kula irukum data va call pana index[0] "value podanum" then after reaching the object we need to use dot " . " to get the value of the spectific data
    catch(err){
        console.log("err",err)
        return res.status(504).send("Error in event list")
    }
}

exports.getEvent = async (req, res) =>{   
    const { id } = req.params;
    try{
        const event = await eventsTbl.findOne({
            where: { id },
            attributes: ['id','event_name','event_description','event_date','event_location','event_link','event_video_link','event_image_link','publish_from','publish_to','status']
        });
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

