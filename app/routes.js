//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)

// Useful things

////// Vicky Teinaki 
////// https://www.vickyteinaki.com/blog/more-efficient-prototyping-with-the-gov-uk-prototype-kit-step-by-step/

// Logging session data and posting it to the console  
router.use((req, res, next) => {    
    const log = {  
      method: req.method,  
      url: req.originalUrl,  
      data: req.session.data  
    }  
    console.log(JSON.stringify(log, null, 2))  
   
  next()  
}) 

router.use('/', (req, res, next) => {  
    res.locals.currentURL = req.originalUrl; //current screen  
    res.locals.prevURL = req.get('Referrer'); // previous screen

    console.log('folder : ' + res.locals.folder + ', subfolder : ' + res.locals.subfolder  );

    next();  
});

// Add your routes here
