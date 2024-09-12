//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

// Useful things

// Add your routes here

/////// Get current page URL
const url = require('url')

router.all('*', function(req, res, next){
  res.locals.currentPageUrl = url.parse(req.url).pathname

  next()
}) 
