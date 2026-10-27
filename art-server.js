/*----------------------------------------------------------------*
 * COMP 4513 - Assignment 1
 * Database-Driven Art API
 * Node, Express, Supabase
 *  
 * art-server.js: contains the server listening for API requests
 *  
 * Juliana Tafalla
 -----------------------------------------------------------------*/

const express = require('express');
const app = express();
const router = require("./art-router.js");

// eras and galleries routes
router.allEras(app);
router.allGalleries(app);
router.galleryByID(app);
router.galleriesByCountry(app);

// artists routes
router.allArtists(app);
router.artistByID(app);
router.artistsByLastName(app);
router.artistsByCountry(app);

// genres routes
router.allGenres(app);
router.genreByID(app);
router.genresByPainting(app);

// paintings routes
router.paintingByID(app);
router.sortPaintings(app);
router.sortAndSkipPaintings(app);
router.paintingsByTitle(app);
router.paintingsByYears(app);
router.paintingsByGallery(app);
router.paintingsByArtist(app);
router.paintingsByGenre(app);
router.paintingsByEra(app);

// count routes
router.countPaintingsByGenres(app);
router.countPaintingsByArtists(app);
router.countPaintingsByTopGenres(app);

// SERVER
const port = 8080;
app.listen(port, () => {
    console.log("[database-driven api]");
    console.log("COMP 4513 - Assignment 1\n");
    console.log("welcome! server is running on port: " + port);
});