const ClassScheduleTable = require('../models/classSchedule')
const { classScheduleService } = require('../services')

const changeTimeSTtringToDate = (timeString) => {
  const [time, period] = timeString.split(' ')
  const [hours, minutes] = time.split(':').map(Number)
  console.log('Hours:', hours, 'Minutes:', minutes)

  let hourFormat = hours
  if (period === 'PM' && hours < 12) {
    hourFormat += 12
  } else if (period === 'AM' && hours === 12) {
    hourFormat = 0
  }
  console.log('Hours24:', hourFormat)

  const date = new Date()
  date.setHours(hourFormat, minutes, 0, 0)
  console.log((date.toLocaleTimeString()))

  return date.toLocaleTimeString()
}

// GET DAY OF THE WEEK FROM THE DATE
const getDayOfTheWeek = (dayString) => {
  const date = new Date(dayString)
  console.log('day of the week', date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase())
  return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
}

async function ScheduleTimeTable (req, res) {
  try {
    const { subject, className, date, startTime, endTime, topic, color } = req.body

    // save date in ISO format
    const currentDate = new Date(date)
    console.log(currentDate)

    // parse time strings into date objects
    const startTimeNum = changeTimeSTtringToDate(startTime)
    const endTimeNum = changeTimeSTtringToDate(endTime)

    // const teacher =  req.user.id;
    const result = new ClassScheduleTable({
      subject,
      className,
      date: currentDate,
      startTime: startTimeNum,
      endTime: endTimeNum,
      topic,
      day: getDayOfTheWeek(date),
      color
      //   teacher
    })

    await result.save()
    console.log(result)
    res.status(200).json({ message: 'schedule saved', status: true })
  } catch (err) {
    console.log(err.message)
    res.status(400).json({ message: 'err.message' })
  }
}

const getScheduleByCurrentWeek = async (req, res) => {
  try {
    // get start date of the week
    const start = new Date()
    start.setDate(start.getDate() - start.getDay())

    //    get end date of the week in ISO format
    const end = new Date(start)
    end.setDate(end.getDate() + 6)
    // console.log(start);
    // console.log(end);

    const weeklySchedule = await classScheduleService.getScheduleByCurrentWeek(start, end)
    return res.status(201).json({ message: 'Schedule for the current week ', data: weeklySchedule })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const getAllClassSchedule = async (req, res) => {
  try {
    const user = req.user
    const schedule = await classScheduleService.getAllClassSchedule(user)
    return res.status(201).json({ message: 'success', schedule })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

const getClassScheduleById = async (req, res) => {
  try {
    const id = req.params.id
    const getscheduleById = await classScheduleService.getClassScheduleById(id)
    return res.status(201).json(getscheduleById)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getClassScheduleByIdAndUpdate = async (req, res) => {
  try {
    const id = req.params.id
    const update = req.body
    // send id and update (i.e : the update coming from the frontend)
    const updateById = await classScheduleService.getClassScheduleByIdAndUpdate(id, update)
    return res.status(201).json({ message: 'success', newSchedule: updateById })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const getClassScheduleByIdAndDelete = async (req, res) => {
  try {
    const id = req.params.id
    await classScheduleService.getClassScheduleByIdAndDelete(id)
    return res.status(201).json({ message: 'class-schedule deleted successfully' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getScheduleByCurrentWeek,
  ScheduleTimeTable,
  getAllClassSchedule,
  // getClassScheduleByClass,
  getClassScheduleById,
  getClassScheduleByIdAndUpdate,
  getClassScheduleByIdAndDelete
}
