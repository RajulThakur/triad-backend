import express from 'express'
import { createTool, getAllTools } from '../controllers/tool.js'

const toolRouter = express.Router()

toolRouter.route('/').post(createTool)
toolRouter.route('/').get(getAllTools)

export default toolRouter