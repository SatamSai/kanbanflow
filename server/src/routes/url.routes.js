const { Router } = require("express");
const { handleGenerateNewShortUrl, handleGetRedirectUrl, handleGetAnalytics } = require("../controllers/url.controllers");


const router = Router()

router.post("/", handleGenerateNewShortUrl)
router.get("/:shortId", handleGetRedirectUrl)
router.get("/analytics/:shortId", handleGetAnalytics)


module.exports = {
    urlRouter: router
}