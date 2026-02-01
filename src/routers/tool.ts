import express from 'express'
import { createTool } from '../controllers/tool.js'

const toolRouter = express.Router()

toolRouter.route('/').post(createTool)

export default toolRouter