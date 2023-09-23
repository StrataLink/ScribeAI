const router = express.Router();

router.use('/auth', authRoutes)
router.use('/user', checkAuth_, userRoutes)

module.exports = router;