import { coinFlips, countFlips, coinFlip, flipACoin } from "./modules/coin.mjs"
import minimist from 'minimist'
const express = require('express')
const app = express()
const arg = minimist(process.argv.slice(2))
arg["port"]
const HTTP_PORT = arg.port || 5000
const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
})
app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
})
app.get('/app/flips/:number', (req, res) => {
    const flips = coinFlips(req.params.number)
    const count = countFlips(flips)
    res.status(200).json({ "raw" : flips, "summary" : count })
})
app.get('/app/flip/', (req, res) => {
    const flip = coinFlip()
    res.status(200).json({ "flip" : flip })
})
app.get('/app/flip/call/:guess(heads|tails)/', (req, res, next) => {
    const game = flipACoin(req.params.guess)
    res.status(200).json(game)
})
app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
})