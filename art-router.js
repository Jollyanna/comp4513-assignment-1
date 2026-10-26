/*----------------------------------------------------------------*
 * COMP 4513 - Assignment 1
 * Database-Driven Art API
 * Node, Express, Supabase
 *  
 * art-router.js: contains the implemented API routes
 *  
 * Juliana Tafalla
 -----------------------------------------------------------------*/
require('dotenv').config();
const supa = require('@supabase/supabase-js');
const supaUrl = process.env.API_URL;
const supaAnonKey = process.env.API_KEY;
const supabase = supa.createClient(supaUrl, supaAnonKey);

const jsonMessage = (msg) => {
    return { message: msg };
};

// ROUTES
/* allEras(): returns all the eras */
const allEras = (app) => {
    app.get("/api/eras", async (req, res) => {
        const { data, error } = await supabase
            .from("eras")
            .select();

        if (error) 
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: query returned nothing!`));
        else 
            res.send(data);
    });
};

/* allGalleries(): returns all the galleries */
const allGalleries = (app) => {
    app.get("/api/galleries", async (req, res) => {
        const { data, error } = await supabase 
            .from("galleries")
            .select()
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: query returned nothing!`));
        else 
            res.send(data);
    });
}

/* galleryByID(): returns a gallery specified by galleryId */
const galleryByID = (app) => {
    app.get("/api/galleries/:ref", async (req, res) => {
        const id = req.params.ref;
        const { data, error } = await supabase 
            .from("galleries")
            .select()
            .eq("galleryId", id);
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: gallery with id = ${id} not found!`));
        else 
            res.send(data);
    });
}

/* galleriesByCountry(): returns galleries specified by a substring of galleryCountry */
const galleriesByCountry = (app) => {
    app.get("/api/galleries/country/:substring", async (req, res) => {
        const country = req.params.substring;
        const { data, error } = await supabase
            .from("galleries")
            .select()
            .ilike("galleryCountry", `${country}%`);
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: galleries in country with substring = ${country} not found!`));
        else 
            res.send(data);
    });
}

/* allArtists(): returns all the artists */
const allArtists = (app) => {
    app.get("/api/artists", async (req, res) => {
        const { data, error } = await supabase
            .from("artists")
            .select()

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: query returned nothing!`));
        else 
            res.send(data);
    });
}

/* artistByID(): returns an artist specified by artistId */
const artistByID = (app) => {
    app.get("/api/artists/:ref", async (req, res) => {
        const id = req.params.ref;
        const { data, error } = await supabase 
            .from("artists")
            .select()
            .eq("artistId", id);
        
        if (error) 
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));  
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: artist with id = ${id} not found!`));
        else 
            res.send(data);
    });
}

/* artistsByLastName(): returns artists specified by a substring of lastName */
const artistsByLastName = (app) => {
    app.get("/api/artists/search/:substring", async (req, res) => {
        const name = req.params.substring;
        const { data, error } = await supabase 
            .from("artists")
            .select()
            .ilike("lastName", `${name}%`);
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`)); 
        else if (data.length == 0)
            res.send(jsonMessage(`uh oh, an error occurred: artists' last names with substring = ${name} not found!`));
        else
            res.send(data);
    });
}

/* artistsByCountry(): returns artists specified by a substring of nationality */
const artistsByCountry = (app) => {
    app.get("/api/artists/country/:substring", async (req, res) => {
        const country = req.params.substring;
        const { data, error } = await supabase
            .from("artists")
            .select()
            .ilike("nationality", `${country}%`);
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`)); 
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: artists in country with substring = ${country} not found!`));
        else 
            res.send(data);
    });
}

/* allGenres(): returns all the genres and its eras */
const allGenres = (app) => {
    app.get("/api/genres", async (req, res) => {
        const { data, error } = await supabase 
            .from("genres")
            .select(`
                *,
                eras (*)
            `)

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));    
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: table not found!`));
        else 
            res.send(data);
    });
}

/* genreByID(): returns a genre and its era specified by genreID */
const genreByID = (app) => {
    app.get("/api/genres/:ref", async (req, res) => {
        const id = req.params.ref;
        const { data, error } = await supabase 
            .from("genres")
            .select(`
                *,
                eras (*)
            `)
            .eq("genreID", id);

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: genre with id = ${id} not found!`));
        else 
            res.send(data);
    });
}

/* genresByPainting(): returns genres used in a painting specified by its paintingId */
const genresByPainting = (app) => {
    app.get("/api/genres/painting/:ref", async (req, res) => {
        const id = req.params.ref;
        const { data, error } = await supabase
            .from("genres")
            .select(`
                *,
                eras (*),
                painting_genres!inner ()
            `)
            .eq("painting_genres.paintingId", id)
            .order("genreName", {ascending: true});

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: genres used in painting with id = ${id} not found!`)); 
        else 
            res.send(data);
    });
}

/* paintingByID(): returns a painting specified by paintingID */
const paintingByID = (app) => {
    app.get("/api/paintings/single/:ref", async (req, res) => {
        const id = req.params.ref;
        const { data, error } = await supabase
            .from("paintings")
            .select()
            .eq("paintingID", id);
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: painting with id = ${id} not found!`)); 
        else 
            res.send(data);
    });
}

/* sortPaintings(): returns paintings sorted by either its title or yearOfWork */
const sortPaintings = (app) => {
    app.get("/api/paintings/sort/:sortBy/limit{/:ref}", async (req, res) => { 
        const sort = req.params.sortBy;
        const sortBy = 
            sort == "title" ? "title"     : 
            sort == "year" ? "yearOfWork" :
            sort;

        const lim = req.params.ref;
        const limit = 
            lim > 0 ? lim    : 
            lim == 0 ? "ALL" : // if no limit provided, also return all paintings
            -1;                // for invalid limits (strings/negative values)
        
        // check for errors in advance: ensure that only the title or yearOfWork fields can be used to sort table and that limit is a positive value
        if (!["title", "yearOfWork"].includes(sortBy)) {
            res.send(jsonMessage(`uh oh, an error occurred: table cannot be sorted by = ${sort} because ${sort} is invalid!`)); 
            return;
        }
        if (limit == -1) {
            res.send(jsonMessage(`uh oh, an error occurred: table cannot be limited by = ${lim} because ${lim} is invalid!`)); 
            return;
        }

        const { data, error } = await supabase
            .from("paintings")
            .select(`
                *,
                artists!inner (*),
                galleries!inner (*)
            `)
            .order(sortBy, { ascending: true })
            .limit(limit)
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0) 
            res.send(jsonMessage(`uh oh, an error occurred: table sorted by = ${sort} and limited by = ${lim} not found!`)); 
        else 
            res.send(data);
    });
}

/* sortAndSkipPaintings(): returns paintings sorted by either its title or yearOfWork. skips certain number of records specified by skip value */
const sortAndSkipPaintings = (app) => {
    app.get("/api/paintings/sort/:sortBy/limit/:ref/skip{/:ref2}", async (req, res) => {
        const sort = req.params.sortBy;
        const sortBy =
            sort == "title" ? "title"     :
            sort == "year" ? "yearOfWork" :
            sort;
        
        const lim = req.params.ref;
        const limit = 
            lim > 0 ? lim :  
            -1;            // for invalid limits (strings/zero/negative values)
        
        const skip = req.params.ref2; 
        const start = 
            parseInt(skip) >= 0 ? parseInt(skip) : 
            skip == null ? 0                     : // currently assuming that leaving skip undefined will have the same behaviour as the previous route
            -1;
        const end = start + limit;

        // check for errors in advance: ensure that only the title or yearOfWork fields can be used to sort table, limit is a positive value, and skip is a positive value
        if (!["title", "yearOfWork"].includes(sortBy)) {
            res.send(jsonMessage(`uh oh, an error occurred: table cannot be sorted by = ${sort} because ${sort} is invalid!`)); 
            return;
        }
        if (limit == -1) {
            res.send(jsonMessage(`uh oh, an error occurred: table cannot be limited by = ${lim} because ${lim} is invalid!`)); 
            return;
        }
        if (start == -1) {
            res.send(jsonMessage(`uh oh, an error occurred: table cannot be skipped to = ${skip} because ${skip} is invalid!`)); 
            return;
        }
        
        const { data, error } = await supabase
            .from("paintings")
            .select(`
                *,
                artists!inner (*),
                galleries!inner (*)
            `)
            .order(sortBy, { ascending: true })
            .range(start, end)
            .limit(limit);
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));        
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: table sorted by = ${sort}, limited by = ${lim}, and skipped to = ${skip} not found!`)); 
        else 
            res.send(data);
    });
}

/* paintingsByTitle(): returns paintings specified by a substring of title */
const paintingsByTitle =  (app) => {
    app.get("/api/paintings/search/:substring", async (req, res) => {
        const title = req.params.substring;
        const { data, error } = await supabase
            .from("paintings")
            .select(`
                *,
                artists!inner (*),
                galleries!inner (*)
            `)
            .ilike("title", `%${title}%`)
            .order("yearOfWork", { ascending: true });
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: paintings' titles with substring = ${title} not found!`));
        else 
            res.send(data);
    });
}

/* paintingsByYears(): returns paintings between two years specified by yearOfWork */
const paintingsByYears = (app) => {
    app.get("/api/paintings/years/:start/:end", async (req, res) => {
        const start = req.params.start;
        const end = req.params.end;
        
        // check for errors in advance: ensure that start year is earlier than or the same as end year
        if (start > end) {
            res.send(jsonMessage(`uh oh, an error occurred: end year = ${end} is earlier than start year = ${start}!`));
            return;
        }
        
        const { data, error } = await supabase
            .from("paintings")
            .select(`
                *,
                artists!inner (*),
                galleries!inner (*)
            `)
            .gte("yearOfWork", start)
            .lte("yearOfWork", end)
            .order("yearOfWork", { ascending: true });

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: paintings created in between years = ${start} - ${end} not found!`));
        else 
            res.send(data);
    });
}

/* paintingsByGallery(): returns paintings specified by galleryId */
const paintingsByGallery = (app) => {
    app.get("/api/paintings/galleries/:ref", async (req, res) => {
        const id = req.params.ref;
        const { data, error } = await supabase
            .from("paintings")
            .select(`
                *,
                artists!inner (*),
                galleries!inner (*)
            `)
            .eq("galleries.galleryId", id)
            .order("yearOfWork", { ascending: true });
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: paintings in galleries = ${id} not found!`));
        else 
            res.send(data);
    });
}

/* paintingsByArtist(): returns paintings specified by artistId */
const paintingsByArtist = (app) => {
    app.get("/api/paintings/artist/:ref", async (req, res) => {
        const id = req.params.ref;
        const { data, error } = await supabase
            .from("paintings")
            .select(`
                *,
                artists!inner (*),
                galleries!inner (*)
            `)
            .eq("artists.artistId", id)
            .order("yearOfWork", { ascending: true });
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: paintings by artist = ${id} not found!`));
        else 
            res.send(data);
    });
}

/* paintingsByGenre(): returns paintings specified by genreId */
const paintingsByGenre = (app) => {
    app.get("/api/paintings/genre/:ref", async (req, res) => {
        const id = req.params.ref;
        const { data, error } = await supabase
            .from("paintings")
            .select(`
                paintingID, title, yearOfWork,
                artists!inner (*),
                galleries!inner (*),
                painting_genres!inner ()
            `)
            .eq("painting_genres.genreId", id)
            .order("yearOfWork", { ascending: true });

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: paintings with genre = ${id} not found!`));
        else 
            res.send(data);
    });
}

/* paintingsByEra(): returns paintings specified by eraId */
const paintingsByEra = (app) => {
    app.get("/api/paintings/era/:ref", async (req, res) => {
        const era = req.params.ref;
        const { data, error } = await supabase 
            .from("paintings")
            // "genres" table is joined only to "painting_genres" table (not parent table, "paintings"), hence the nested statement
            .select(`
                paintingID, title, yearOfWork,
                artists!inner (*),
                galleries!inner (*),
                painting_genres!inner ( genres!genreId!inner () )
            `)
            .eq("painting_genres.genres.eraID", era)
            .order("yearOfWork", { ascending: true });

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: paintings in era = ${era} not found!`));
        else 
            res.send(data);
    });
}

/*  countPaintingsByGenres(): returns number of paintings by genre 
    notes: 
        - vw_count_paintings_by_genres is a view that joins the tables "genres" and "painting_genres" and groups it by the genreId field
        - there was an attempt to write the function without using views (see commented block after this function), but i couldn't figure out how to order it, so... 
        - to save my sanity, i've simply decided to make a view for this and the rest of the routes   
    
    view definition:
    -- vw_count_paintings_by_genres
    CREATE OR REPLACE VIEW vw_count_paintings_by_genres AS
    SELECT 
        g."genreName" AS "genre", 
        COUNT(pg."paintingId") AS "number of paintings"
    FROM 
        painting_genres pg 
    JOIN 
        genres g ON g."genreID" = pg."genreId"
    GROUP BY 
        pg."genreId",
        g."genreName"     
*/
const countPaintingsByGenres = (app) => {
    app.get("/api/counts/genres", async (req, res) => {
        const { data, error } = await supabase 
            .from("vw_count_paintings_by_genres")
            .select()
            .order("number of paintings", { ascending: true } );

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: query returned nothing!`));
        else 
            res.send(data);        
    });
}
/*

// an attempt to only use the API to construct query (no views); works fine until ordering by total
// guided by: https://supabase.com/docs/guides/api/sql-to-rest
const countPaintingsByGenres = (app) => {
    app.get("/api/counts/genres", async (req, res) => {
        const { data, error } = await supabase 
            .from("painting_genres")
            .select(`
                ...genres (genre:genreName),
                genreId,
                "number of paintings":paintingId.count()
            `)
            .order("number of paintings", { ascending: true } ); // not sure how to do this part...

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: query returned nothing!`));
        else 
            res.send(data);        
    });
}
*/

/*  countPaintingsByArtists(): returns number of paintings by artists 
    notes: 
        - vw_count_paintings_by_artists is a view that joins the tables "paintings" and "artists" and groups it by the artistId field
        - to save my sanity, i've simply decided to make a view for this and the rest of the routes  
    
    view definition: 
    -- vw_count_paintings_by_artists
    CREATE OR REPLACE VIEW vw_count_paintings_by_artists AS
    SELECT
        FORMAT('%s %s', a."firstName", a."lastName") AS artist, 
        COUNT(p."paintingID") as "number of paintings"
    FROM 
        paintings p
    JOIN 
        artists a ON a."artistId" = p."artistID"
    GROUP BY 
        p."artistID", 
        a."firstName", 
        a."lastName"
*/
const countPaintingsByArtists = (app) => {
    app.get("/api/counts/artists", async (req, res) => {
        const { data, error } = await supabase
            .from("vw_count_paintings_by_artists")
            .select()
            .order("number of paintings", { ascending: false } );
        
        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: query returned nothing!`));
        else 
            res.send(data);
    });
}

/*  countPaintingsByTopGenres(): returns number of paintings for genres with total paintings over a specified value 
    notes:
        - vw_count_paintings_by_genres is a view that joins the tables "genres" and "painting_genres" and groups it by the genreId field
*/
const countPaintingsByTopGenres = (app) => {
    app.get("/api/counts/topgenres/:ref", async (req, res) => {
        const top = req.params.ref;
        const { data, error } = await supabase 
            .from("vw_count_paintings_by_genres")
            .select()
            .gt("number of paintings", top)
            .order("number of paintings", { ascending: false } );

        if (error)
            res.send(jsonMessage(`uh oh, an error occurred: ${error.message}!`));
        else if (data.length == 0)  
            res.send(jsonMessage(`uh oh, an error occurred: genres with number of paintings over a total = ${top} not found!`));
        else 
            res.send(data);        
    });
}

module.exports = {
    allEras,
    allGalleries,
    galleryByID,
    galleriesByCountry,

    allArtists,
    artistByID,
    artistsByLastName,
    artistsByCountry,

    allGenres,
    genreByID,
    genresByPainting,

    paintingByID,
    sortPaintings,
    sortAndSkipPaintings,
    paintingsByTitle,
    paintingsByYears,
    paintingsByGallery,
    paintingsByArtist,
    paintingsByGenre,
    paintingsByEra,

    countPaintingsByGenres,
    countPaintingsByArtists,
    countPaintingsByTopGenres
}