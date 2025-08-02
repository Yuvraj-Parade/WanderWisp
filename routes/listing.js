const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../clouldConfig.js");
const upload = multer({ storage })

router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, 
        upload.single('listing[image]'),
    wrapAsync(listingController.createListing)
    );

// validateListing,
//new route
router.get("/new",isLoggedIn, listingController.renderNewForm);


router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner , wrapAsync(listingController.destroyListing));

//index route
// router.get("/", wrapAsync(listingController.index));


 
//show route
// router.get("/:id",wrapAsync(listingController.showListing));


//create route
// router.post("/",isLoggedIn, validateListing,
//     wrapAsync(listingController.createListing));

//Edit route
router.get("/:id/edit",isLoggedIn,  isOwner , wrapAsync(listingController.renderEditForm));

//update 
// router.put("/:id", isLoggedIn, isOwner ,validateListing, wrapAsync(listingController.updateListing));

//delete route
// router.delete("/:id" ,isLoggedIn, isOwner , wrapAsync(listingController.destroyListing));

module.exports = router;