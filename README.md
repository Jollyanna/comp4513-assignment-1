# COMP 4513 - Assignment 1: Database-Driven API

## Overview
The repository holds the code for a database-driven API that queries an art database and returns data in JSON format. The database contains data on eras, galleries, artists, genres, paintings, and shapes. The project uses Node.js and Express for the server and routing, Supabase for the database, and Render for the hosting.  

## Sample API Request and Response
**Request**: `/api/artists/7`
<br />
**Response**:
```
[
  {
    "artistId": 7,
    "firstName": "Eugene",
    "lastName": "Delacroix",
    "nationality": "France",
    "gender": "M",
    "yearOfBirth": 1798,
    "yearOfDeath": 1863,
    "details": "Eugene Delacroix was a French Romantic artist regarded from the outset of his career as the leader of the French Romantic school. Delacroix's use of expressive brush strokes and his study of the optical effects of colour profoundly shaped the work of the Impressionists, while his passion for the exotic inspired the artists of the Symbolist movement. A fine lithographer, Delacroix illustrated various works of William Shakespeare, the Scottish writer Walter Scott and the German writer Johann Wolfgang von Goethe.",
    "artistLink": "http://en.wikipedia.org/wiki/Eug%C3%A8ne_Delacroix"
  }
]
```

## Testing API Endpoints
The table shows the format of the endpoints, some sample API requests, and its expected results. Endpoint formats that are empty (ie. quotes only) indicate that the format is the same as the previous row. Valid requests return data, invalid requests fail to return data due to invalid inputs, and requests that return nothing may be valid requests that fail to return data (ie. record doesn't exist, parameter is out of data's scope, etc.).

| Endpoint Format | Sample Request | Expected Result |
| ------------- | ------------- | ------------- |
`/api/eras` | [`/api/eras`](https://comp4513-assignment-1-60wg.onrender.com/api/eras) | valid request: returns all the eras 
`/api/galleries` | [`/api/galleries`](https://comp4513-assignment-1-60wg.onrender.com/api/galleries) | valid request: returns all the galleries 
`/api/galleries/:ref` | [`/api/galleries/30`](https://comp4513-assignment-1-60wg.onrender.com/api/galleries/30)  | valid request: returns a gallery with reference value = 30 
`""`| [`/api/galleries/calgary`](https://comp4513-assignment-1-60wg.onrender.com/api/galleries/calgary) | invalid request: gallery reference value = calgary is invalid 
`/api/galleries/country/:substring` | [`/api/galleries/country/fra`](https://comp4513-assignment-1-60wg.onrender.com/api/galleries/country/fra) | valid request: returns galleries from countries that begin with "fra"
| |
`/api/artists` | [`/api/artists`](https://comp4513-assignment-1-60wg.onrender.com/api/artists) | valid request: returns all the artists 
`/api/artists/:ref` | [`/api/artists/12`](https://comp4513-assignment-1-60wg.onrender.com/api/artists/12) | valid request: returns an artist with reference value = 12 
`""` | [`/api/artists/1223423`](https://comp4513-assignment-1-60wg.onrender.com/api/artists/1223423) | request returns nothing: artist reference value = 1223423 does not exist
`/api/artists/search/:substring` | [`/api/artists/search/ma`](https://comp4513-assignment-1-60wg.onrender.com/api/artists/search/ma) | valid request: returns artists whose last name begin with "ma"
`""` | [`/api/artists/search/mA`](https://comp4513-assignment-1-60wg.onrender.com/api/artists/search/ma) | valid request: returns artists whose last name begin with "mA" (case insensitive)
`/api/artists/country/:substring` | [`/api/artists/country/fra`](https://comp4513-assignment-1-60wg.onrender.com/api/artists/country/fra) | valid request: returns artists whose nationality begin with "fra"
| |
`/api/genres` | [`/api/genres`](https://comp4513-assignment-1-60wg.onrender.com/api/genres) | valid request: returns all the genres
`/api/genres/:ref` | [`/api/genres/76`](https://comp4513-assignment-1-60wg.onrender.com/api/genres/76) | valid request: returns a genre with reference value = 76
`/api/genres/painting/:ref` | [`/api/genres/painting/408`](https://comp4513-assignment-1-60wg.onrender.com/api/genres/painting/408) | valid request: returns genres of a painting with reference value = 408
`""` | [`/api/genres/painting/jsdfhg`](https://comp4513-assignment-1-60wg.onrender.com/api/genres/painting/jsdfhg) | invalid request: painting reference value = jsdfhg is invalid
| |
`/api/paintings/single/:ref` | [`/api/paintings/single/63`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/single/63) | valid request: returns a painting with reference value = 63
`/api/paintings/sort/:(title\|year)/limit/:ref` | [`/api/paintings/sort/title/limit/10`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/sort/title/limit/10) | valid request: returns paintings sorted by "title" and limited to 10 paintings
`""` | [`/api/paintings/sort/year/limit/10`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/sort/year/limit/10) | valid request: returns paintings sorted by "year" and limited to 10 paintings
`""` | [`/api/paintings/sort/absd/limit/10`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/sort/absd/limit/10) | invalid request: sort reference value = absd is invalid
`""` | [`/api/paintings/sort/year/limit/asd`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/sort/year/limit/asd) | invalid request: limit reference value = asd is invalid
`""` | [`/api/paintings/sort/year/limit`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/sort/year/limit) | invalid request: limit reference value is undefined
`/api/paintings/sort/:(title\|year)/limit/:ref/skip/:ref2` | [`/api/paintings/sort/year/limit/10/skip/30`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/sort/year/limit/10/skip/30) | valid request: returns paintings sorted by "title", limited to 10 paintings, and skipped by 30 paintings
`""` | [`/api/paintings/sort/year/limit/10/skip/30000`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/sort/year/limit/10/skip/30000) | request returns nothing: skip reference value results in no paintings; skip reference value is greater than the number of paintings
`""` | [`/api/paintings/sort/year/limit/10/skip`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/sort/year/limit/10/skip) | invalid request: skip reference value is undefined
`/api/paintings/search/:substring` | [`/api/paintings/search/port`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/search/port) | valid request: returns paintings whose title contains "port"
`""` | [`/api/paintings/search/pORt`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/search/pORt) | valid request: returns paintings whose title contains "pORt" (case insensitive)
`""` | [`/api/paintings/search/connolly`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/search/connolly) | request returns nothing: title reference value = connolly does not exist
`/api/paintings/years/:start/:end` | [`/api/paintings/years/1800/1850`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/years/1800/1850) | valid request: returns paintings in between years 1800 and 1850 (inclusive)
`""` | [`/api/paintings/years/1850/1800`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/years/1850/1800) | invalid request: start year = 1850 is later than end year = 1800
`/api/paintings/galleries/:ref` | [`/api/paintings/galleries/5`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/galleries/5) | valid request: returns paintings in a gallery with reference value = 5
`/api/paintings/artist/:ref` | [`api/paintings/artist/16`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/artist/16) | valid request: returns paintings by an artist with reference value = 16
`""` | [`api/paintings/artist/666`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/artist/666) | request returns nothing: artist reference value = 666 does not exist
`/api/paintings/genre/:ref` | [`/api/paintings/genre/78`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/genre/78) | valid request: returns paintings for a genre with reference value = 
`/api/paintings/era/:ref` | [`/api/paintings/era/2`](https://comp4513-assignment-1-60wg.onrender.com/api/paintings/era/2) | valid request: returns paintings from an era with reference value = 2
| |
`/api/counts/genres` | [`/api/counts/genres`](https://comp4513-assignment-1-60wg.onrender.com/api/counts/genres) | valid request: returns the number of paintings for each genre
`/api/counts/artists` | [`/api/counts/artists`](https://comp4513-assignment-1-60wg.onrender.com/api/counts/artists) | valid request: returns the number of paintings for each artist
`/api/counts/topgenres/:ref` | [`/api/counts/topgenres/20`](https://comp4513-assignment-1-60wg.onrender.com/api/counts/topgenres/20) | valid request: returns the number of paintings for each genre with total paintings over 20 paintings
`""` | [`/api/counts/topgenres/2034958`](https://comp4513-assignment-1-60wg.onrender.com/api/counts/topgenres/2034958) | request returns nothing: total reference value results in no paintings; total reference value is greater than the maximum total number of paintings

> Database-Driven API <br />
> Juliana Tafalla