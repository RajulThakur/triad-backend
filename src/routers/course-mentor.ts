import express from 'express'
import { assignMentorsToCourse } from '../controllers/course-mentor.js'

const courseMentorRouter = express.Router()

courseMentorRouter.route('/:courseId/').post(assignMentorsToCourse)

export default courseMentorRouter
