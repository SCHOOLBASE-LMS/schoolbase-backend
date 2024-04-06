const express = require("express");
const classSchedule = require("../models/classSchedule");
const { classScheduleService } = require('../services')

const getClassScheduleByClass = async (req, res) => {
    try {
      const getscheduleClass = await classScheduleService.getAllClassSchedule(req.user, req.user.role, req.user.class)
      return res.status(201).json(getscheduleClass)
    } catch (err) {
      return res.status(500).json({ error: err.message })
  
    }
  }
  

module.exports = {
    getClassScheduleByClass,
      }