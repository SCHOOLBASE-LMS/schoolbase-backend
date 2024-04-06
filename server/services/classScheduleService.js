const {ClassScheduleTable} = require("../models")

const getAllClassSchedule = async (requestUser) =>{
    // ensure the user isLoggedIn
    if(!requestUser) throw new Error (`Unauthorized`)

        // get all the schedule
    const classSchedule = await ClassScheduleTable.findAll()
  if(!classSchedule) throw new Error(`No class-schedule found `)
  return classSchedule
}


const getClassScheduleByClass = async (requestUser, requestRole, requestClass) => {
    // ensure the user isLoggedIn and is a student 
    if(!requestUser || requestRole != "student") throw new Error (`Unauthorized: Only student can view`)

    // get the class of the loggedIn student
    const studentClass = requestClass;

    // filter the schema by student class

    const uniqueClassSchedule = await ClassSchedule.find({class:studentClass})
    return uniqueClassSchedule
}

module.exports = {
    getAllClassSchedule,
    getClassScheduleByClass,
}