const express = require("express");
const classSchedule = require("../models/classSchedule");

async function getScheduleByCurrentWeek(req, res) {
    try {
        // get start date of the week 
        const start = new Date();
        start.setDate(start.getDate() - start.getDay());

        //    get end date of the week in ISO format
        const end = new Date(start);
        end.setDate(end.getDate() + 6);
        // console.log(start);
        // console.log(end);

        //    find from the database 
        const scheduleForTheWeek = await classSchedule.find({
            date: { $gte: start, $lte: end }
        })

        console.log(scheduleForTheWeek)

        // check if there is a schedule for the week
        if (scheduleForTheWeek.length === 0) {
            res.status(404).json({ message: "No schedule available for this current week" });

        } else {
            res.status(200).send({ message: "Schedule for the current week ", data: scheduleForTheWeek })
        }
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    getScheduleByCurrentWeek
}