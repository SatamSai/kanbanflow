const URL = require("../models/url.model")
const { nanoid } = require('nanoid')

const handleGenerateNewShortUrl = async (req, res) => {

    const body = req.body
    if (!body.url) return res.status(400).json({ error: "url is required " })

    const shortId = nanoid(8)
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: []
    })

    return res.status(201).json({ shortId })
}

const handleGetRedirectUrl = async (req, res) => {
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        })
    return res.redirect(entry.redirectURL)
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId
    const result = await URL.findOne({ shortId })
    return res.status(200).json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}

const handleGenerateUrlsTemplate = async (req, res) => {
    const urls = await URL.find({})
    return res.render("home", { urls })
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetRedirectUrl,
    handleGetAnalytics,
    handleGenerateUrlsTemplate
}