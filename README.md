# Wiki Map

A full stack web app built to connect friends who want to create and share maps and map points together.

The app uses the open-source Leaflet[^leaflet] Javascript library with Mapbox[^mapbox] tile data to display a user-friendly map interface.

This app was built as a midterm project for the Lighthouse Labs web development program by [Grace Wang](https://github.com/GraceWXT), [Josh Sparkes](https://github.com/Sparkes21) and [Iaan Johnston](https://github.com/double-slide).

# Product Views

!["Homepage"](https://github.com/GraceWXT/wiki-map/blob/main/public/images/localhost_8080_maps%20(1).png?raw=true)
!["Map view"](https://github.com/GraceWXT/wiki-map/blob/main/public/images/localhost_8080_maps_2.png?raw=true)
!["Profile page"](https://github.com/GraceWXT/wiki-map/blob/main/public/images/localhost_8080_users_profile.png?raw=true)

## Dependencies

- Node
- NPM
- PG
- Chalk
- EJS
- Express
- Cookie-parser

## Project Setup

1. Install all dependencies (`npm install`)
2. Reboot the database (`npm run db:reset`)
3. Run the development web server (`npm start`)
4. Navigate to `localhost:8080/maps`
5. Using DevTools, create a cookie `user_id` with a value of 1, 2, or 3--this will enable you to navigate the site as a logged-in user (in the current development state)[^devtools]

## Functionality
- A user can create a map, and then save pins to that map
- Pins must contain a title and location (location is determined from map click)
- Pins can optionally contain a description and image URL
- Other users can add pins to any map
- Only the creator of a pin can edit or delete that pin
- Users can view their profile page, which includes summary lists of their maps, 'liked' maps by others, and pins they've contributed to other maps.

## Future Objectives
- Add user authentication
- Add cloud database support and hosting
- Improve responsive design for various screen sizes
- Build-out error pages to provide more visual continuity

[^leaflet]: Refer to https://leafletjs.com/ 
[^mapbox]: Refer to https://www.mapbox.com/
[^devtools]: Refer to https://developer.chrome.com/docs/devtools/
