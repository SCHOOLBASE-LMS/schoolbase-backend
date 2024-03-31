const express = require("express");
const classSchedule = require("../models/classSchedule");

async function ScheduleTimeTable (req,res) {
 try {
    const {subject, className, startTime, endTime, topic, day,color } = req.body;
    console.log(req.body.className)
     const startTimeNum = new Date(startTime);
     const endTimeNum = new Date(endTime);
    // const teacher =  req.user.id;
      const result = new classSchedule({
          subject,
          className,
          startTime: startTimeNum,
          endTime: endTimeNum,
          topic,
          day,
          color
        //   teacher
       });

      await result.save();
      res.status(200).json({message:"schedule saved", status:true})
 }  
 catch(err){
   console.log(err.message)
   res.status(400).json({message:"err.message"})
 } 
}

module.exports = {
    ScheduleTimeTable
}