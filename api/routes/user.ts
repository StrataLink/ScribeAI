// Picture uploading handling will be done later (refer to api/routes/user.js in Sone for further clarification)

router.get("/profile", async (req, res) => {
    if (!req.user) {
        res.json({status: "not_logged_in"});
    }

    const user = await req.findOne({email: req.user.email})
    return res.json({status: "logged_in", user: user})
})

// other HTTP requests are profile pic upload.

module.exports = router;