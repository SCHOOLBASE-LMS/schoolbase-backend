const express = require("express");
const classSchedule = require("../models/classSchedule");
const { classScheduleService } = require('../services')

const changeTimeSTtringToDate = (timeString) => {
 const [time, period] = timeString.split(" ");
 const [hours , minutes] = time.split(":").map(Number);
 console.log('Hours:', hours, 'Minutes:', minutes);

 let hourFormat = hours;
 if (period === "PM" && hours < 12 ) {
    hourFormat +=12;
 } else if (period === "AM" && hours === 12){
    hourFormat = 0;
 }
 console.log('Hours24:', hourFormat);

 const date = new Date();
 date.setHours(hourFormat, minutes, 0, 0);
 console.log((date.toLocaleTimeString()));

 return date.toLocaleTimeString();
 ;
}


// GET DAY OF THE WEEK FROM THE DATE 
const getDayOfTheWeek = (dayString) => {
const date = new Date(dayString);
console.log("day of the week", date.toLocaleDateString("en-US", {weekday: "long"}).toLowerCase())
return date.toLocaleDateString("en-US", {weekday: "long"}).toLowerCase()
}


async function ScheduleTimeTable(req, res) {
    try {
        const { subject, className, date, startTime, endTime, topic, color } = req.body;
        
        // save date in ISO format
        const currentDate = new Date(date)
        console.log(currentDate);

        // parse time strings into date objects
        const startTimeNum = changeTimeSTtringToDate(startTime);
        const endTimeNum = changeTimeSTtringToDate(endTime);

        
        // const teacher =  req.user.id;
        const result = new classSchedule({
            subject,
            className,
            date: currentDate,
            startTime: startTimeNum,
            endTime: endTimeNum,
            topic,
            day:getDayOfTheWeek(date),
            color
            //   teacher
        });

        await result.save();
        console.log(result)
        res.status(200).json({ message: "schedule saved", status: true })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ message: "err.message" })
    }
}


const  getAllClassSchedule =async  (req,res) =>{
    try{
    const schedule = await classScheduleService.getAllClassSchedule()
    return res.status(201).json({message:"success", schedule})
    } catch(err){
     console.log(err.message)
    }
    }
    
    const  getClassScheduleByClass =async  (req,res) =>{
      try{
      const getscheduleClass = await  classScheduleService.getAllClassSchedule(req.user, req.user.role, req.user.class)
      return res.status(201).json( getscheduleClass)
      } catch(err){
        return res.status(500).json({ error: err.message })
     
      }
      }

      const getClassScheduleById = async (req,res) => {
        try {
           getscheduleById = await classScheduleService.getClassScheduleById(req.params.id)
           return res.status(201).json(getscheduleById)
        }catch(error){
            return res.status(500).json({ error: err.message })

        }
      }
      
    

module.exports = {
    ScheduleTimeTable,
    getAllClassSchedule,
  getClassScheduleByClass,
}