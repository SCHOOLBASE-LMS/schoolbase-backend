const classSchedule = require("../models/classSchedule");

const getAllClassSchedule = async () =>{
    // ensure the user isLoggedIn
    // if(!requestUser) throw new Error (`Unauthorized`)

        // get all the schedule
    const classTimeTable = await classSchedule.find()
  if(! classTimeTable ) throw new Error(`No class-schedule found `)
  return  classTimeTable 
}


const getClassScheduleByClass = async (requestUser, requestRole, requestClass) => {
    // ensure the user isLoggedIn and is a student 
    if(!requestUser || requestRole != "student") throw new Error (`Unauthorized: Only student can view`)

    // get the class of the loggedIn student
    const studentClass = requestClass;

    // filter the schema by student class

    const uniqueClassSchedule = await classSchedule.find({class:studentClass})
    return uniqueClassSchedule
}


const getClassScheduleById = async (scheduleId) => {
    const getTimeTable = await classSchedule.findById({scheduleId})
    return getTimeTable
}

const getClassScheduleByIdAndUpdate = async (scheduleId, updateBody) => {
//    update schedule by id
const updateById = await classSchedule.findByIdAndUpdate(scheduleId,updateBody, {
    new:true,
    $set:updateBody
})
return updateById
}
module.exports = {
    getAllClassSchedule,
    getClassScheduleByClass,
    getClassScheduleById,
    getClassScheduleByIdAndUpdate,
}