import { Router } from "express"
import { getFiles } from "../controllers/file-controllers.js"

export const router = Router()

router.get('/', getFiles)




