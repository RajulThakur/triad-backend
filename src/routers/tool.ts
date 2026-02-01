import express from 'express'
import { createTool, deleteTool, getAllTools, updateTool } from '../controllers/tool.js'

const toolRouter = express.Router()

toolRouter.route('/').post(createTool)
toolRouter.route('/').get(getAllTools)
toolRouter.route('/:id').put(updateTool)
toolRouter.route('/:id').delete(deleteTool)

export default toolRouter