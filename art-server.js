/*----------------------------------------------------------------*
 * COMP 4513 - Assignment 1
 * Database-Driven Art API
 * Node, Express, Supabase
 *  
 * art-server.js: contains the server listening for requests
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
    console.log("hello, world!\n");
    
    console.log("ERAS AND GALLERIES ROUTES");
    console.log("http://localhost:8080/api/eras");
    console.log("http://localhost:8080/api/galleries");
    console.log("http://localhost:8080/api/galleries/30");
    console.log("http://localhost:8080/api/galleries/country/fra");
    
    console.log("\nARTISTS ROUTES");
    console.log("http://localhost:8080/api/artists");
    console.log("http://localhost:8080/api/artists/12");
    console.log("http://localhost:8080/api/artists/search/ma");
    console.log("http://localhost:8080/api/artists/country/fra");

    console.log("\nGENRES ROUTES");
    console.log("http://localhost:8080/api/genres");
    console.log("http://localhost:8080/api/genres/76");
    console.log("http://localhost:8080/api/genres/painting/408");

    console.log("\nPAINTINGS ROUTES");
    console.log("http://localhost:8080/api/paintings/single/63");
    console.log("http://localhost:8080/api/paintings/sort/year/limit/12");
    console.log("http://localhost:8080/api/paintings/sort/year/limit/10/skip/30");
    console.log("http://localhost:8080/api/paintings/search/port");
    console.log("http://localhost:8080/api/paintings/years/1800/1850");
    console.log("http://localhost:8080/api/paintings/galleries/5");
    console.log("http://localhost:8080/api/paintings/artist/16");
    console.log("http://localhost:8080/api/paintings/genre/78");
    console.log("http://localhost:8080/api/paintings/era/2");

    console.log("\nCOUNT ROUTES");
    console.log("http://localhost:8080/api/counts/genres");
    console.log("http://localhost:8080/api/counts/artists")
    console.log("http://localhost:8080/api/counts/topgenres/20");
});