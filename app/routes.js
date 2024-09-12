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

// GET URLs - useful for relative templates
router.use('/', (req, res, next) => {
  res.locals.currentURL = req.originalUrl;
  res.locals.prevURL = req.get('Referrer') ?? "";
  res.locals.uriFragments = res.locals.prevURL.split('/');
  res.locals.uriLastPart = res.locals.uriFragments.slice(-1)[0];
  
  req.folder = res.locals.uriFragments[1] ?? "";
  req.subfolder = res.locals.uriFragments[2] ?? "";

  next();
});



