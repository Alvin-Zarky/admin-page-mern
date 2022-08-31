import express from "express"
import { collectCategory, countAllCategory, createCategory, deleteCategory, updateCategory } from "../controller/categoryController"
import { advancedResultMiddleware } from "../middleware/advancedResultMiddleware"
import { authMiddleware } from "../middleware/authTokenMiddleware"
import Category from "../model/CategoryModel"

const router = express()
router.use(authMiddleware)
router.route('/').post(createCategory).get(advancedResultMiddleware(Category, {
  path: "user",
  select: "userName userEmail",
  model: "User"
}),collectCategory)
router.route('/:id').put(updateCategory).delete(deleteCategory)
router.get('/all', countAllCategory)

export default router