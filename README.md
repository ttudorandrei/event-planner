# Sights & Sounds

## Introduction

**Sights & Sounds** allows you to easily find events and venues, based on your selected location. You can then save the ones you are interested in to your wishlist and - Voila! Your weekend plans are already looking a lot more exciting!

## Table of Contents

[Introduction](#introduction)  
 [Table of Contents](#table-of-contents)  
 [Description](#description)  
 [User Story](#user-story)  
 [Tech](#tech)  
 [Wire Frames](#wire-frames)  
 [Deployed Link to Application](#deployed-link-to-application)  
 [Getting Started](#getting-started)

## Description

## User Story

```
AS A user
I WANT to enter the city and country of a location I want to visit
SO THAT I can see what venues are in that area

AS A user
I WANT to be able to filter the venue type by Restaurant, Arts and Entertainment, and Outdoor and Recreation
SO THAT I only view the venues that I am interested in

AS A user
I WANT to click on a venue to see more details about that venue
SO THAT I can decide whether I want to visit this venue

AS A user
I WANT to save a venue to my wishlist
SO THAT I can view my saved venues at another time

AS A user
I WANT to add a comment to the venues added to my wishlist
SO THAT I can make notes about the venue

AS A user
I WANT to add a date to the venues added to my wishlist
SO THAT I can see when I am planning to visit that venue

AS A user
I WANT search for a new city and country from the search results page without having to revisit the landing page
SO THAT searching for a new city is quick and easy

AS A user
I WANT to see a list of my saved venues in chronological order on the wishlist page
SO THAT I can see when I am planning to visit each venue

AS A user
I WANT to view the events in the area I have searched for with a link to book a ticket for the event
SO THAT I can view be linked to current events in the area
```

## Tech

### CSS Framework - [Materialize](https://materializecss.com/)

We used Materialize to create various elements in our application. A variety of Materialize classes were used to create the following elements:

- The form on the landing page was made using a combination of [text inputs](https://materializecss.com/text-inputs.html), [select elements](https://materializecss.com/select.html), [checkboxes](https://materializecss.com/checkboxes.html), and [buttons](https://materializecss.com/buttons.html).
- The [navigation bar](https://materializecss.com/navbar.html) using the same elements as the form as well as a [multiple select dropdown](https://materializecss.com/select.html).
- The search results cards using the Materialize card elements.
- The modal on the search results page and the wishlist page was created using the [Materialize modal element](https://materializecss.com/modals.html) and accompanying JavaScript. We also added a [text input](https://materializecss.com/text-inputs.html) and a [date picker](https://materializecss.com/pickers.html) from Materialize to the modals.

### Foursquare - [Places API](https://developer.foursquare.com/docs/places-api/)

The main API that we use in this application is the Foursquare Places API. In order to use this API, we had to create an account and were assigned a CLIENT_ID and a CLIENT_SECRET. This is added to every url used when fetching the data.

When the user searches for a city and a country, we use the [search endpoint](https://developer.foursquare.com/docs/venues/search) to get venues in that area. This uses the near parameter to search for venues near the requested city. We have narrowed down the search to three categories: Restaurants, Arts and Entertainment and Outdoor and Recreation using the categoryId parameter. This endpoint returns information such as venue name, venue id, venue type and an icon depending on the type of venue. This information is used to render the search results cards.

When the user clicks on a venue, we use the [venue endpoint](https://developer.foursquare.com/docs/api-reference/venues/details) to get more details about that particular venue. This requires the venue ID that we retrieve from the search request. The venue endpoint returns information such as opening hours, contact information, address, website urls, images etc. We then render this information onto the modal.

### Ticketmaster - [Event Discovery Widget](https://developer.ticketmaster.com/products-and-docs/widgets/event-discovery/)

The Ticketmaster API was the API used to generate the widget on the right-hand side of the page. To use this API we needed an API key which was acquired by creating an account.

To use the Event Discovery Widget, we rendered the code that was provided to us on the search results page and passed in the city and country code that was selected by the user. The widget allows the user to scroll through events local to the location entered and provides a link for them to book a ticket for an event.

## Wire Frames

## Deployed Link to Application

Click [here](https://chelseanicholls95.github.io/event-planner/) to view our project!

## Getting Started

```
git clone git@github.com:chelseanicholls95/event-planner.git
cd event-planner
code .
```

## Future Improvements
