import express from "express"
import { countAllContent, createContent, deleteContent, getContent, getContentDetail, updateContent } from "../controller/contentController"
import { advancedResultMiddleware } from "../middleware/advancedResultMiddleware"
import { authMiddleware } from "../middleware/authTokenMiddleware"
import Content from "../model/ContentModel"

const router= express.Router()
router.use(authMiddleware)
router.get('/all', countAllContent)
router.route('/').post(createContent).get(advancedResultMiddleware(Content, {
  path:"user",
  select: "userName userEmail",
  model: "User"
}),getContent)
router.route('/:id').get(getContentDetail).put(updateContent).delete(deleteContent)

export default router