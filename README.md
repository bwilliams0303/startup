# Pathfinder Second Edition Creature Generator

## Description Deliverable

### Elevator Pitch

Have you ever been struggling to create a custom creature for your Pathfinder Table Top RPG game? It's such a hassel to get out the rules, get some paper, and create a creature from scratch and can take so long. Wouldn't you rather be spending that time preparing other aspects of your next playsession? The Creature Generator streamlines this process so you can get back to the Pathfinder preping that you love the most! The Creature Generator will allow you to generate random creature stats or gives you the tools to make your own in minutes. All of your creations will be saved to a database so everytime you login, you can see the creatures you've created. You will also be able to publish your creature onto the forum page where you and your friends can share your creations and download them for yourself.

### Design

<img width="688" alt="Screenshot 2023-05-08 at 2 14 34 PM" src="https://user-images.githubusercontent.com/70551937/236925207-27ef6baa-257a-4a6e-a91c-be0644be0bba.png">

### Key features

* Secure login over HTTPS
* Ability to create custom creature statistics
* Ability to randomly create creature statistics (with the exclusion of actions, items, immunities, resistances, and weaknesses)
* Ability to save creatures to a user's personal database
* Ability to view/edit/delete creatures already saved to a user's database
* Ability to upload creatures to a forum
* Ability to download creatures from a forum
* Ability for admin to create and delete creatures

### Technologies

* HTML - Uses correct HTML structure for application. Four HTML pages (Login, Creature Creation, View User's Creature Database, Forum).
* CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
* JavaScript - Provides login, creature stat changes, random stat distribution, stat scaling changes, saving creatures to a DB, download creatures from forum, site navigation.
* Service - Backend service with endpoints for:
  - login
  - retrieving user's personal DB
  - saving to user's personal DB
  - uploading creatures to forums
  - retrieving the live creature forum
* DB - Store users and user's creatures in database.
* Login - Register and login users. Credentials securely stored in database. Can't save or upload creatures unless authenticated.
* WebSocket - Other user's uploaded creatures can be seen in the forum.
* React - Application ported to use the React web framework.

## HTML Deliverable

Structure of the application:

* HTML pages - Four HTML pages (Login, Creature Creation, View User's Creature Database, Forum).
* Links - The login page automatically links to the User's Creature Database page. The User's Creature Database page contains links for each creature the user has created, buttons to upload/view/create a creature. There is a menu bar at the top that links to the forum and login page.
* Text - Each creature contains saved statistics, descriptions, tags, and current inventory.
* Login - Input box and submit button for login.
* Database - The user's preexisting created creatures.
* WebSocket - A forum of other user's uploaded creatures.

## CSS Deliverable

Application appearance:

* Header, footer, and main content body.
* Menu Bar elements.
* Window resizing for all devices and screen sizes.
* Effective contrast and white spacing techniques for all parts of the app.
* Consistent use fonts and colors.

## JavaScript Deliverable

For this deliverable I made my application functional to track and display a user's three votes.

* Login - When you press enter or the login button it takes you to the User's Creature Database page.
* Creature Creation - When you press the save button, it saves all of the informaiton on the creature and stores it into that specific user's database
* Creature Upload - When you press the upload button, it uploads the save of that creature to the real time forum.
* Database - Displays the user's saved creatures. Delete creatures. Load and edit preexisting creatures.
* WebSocket - Upload's creatures to a real time forum where all other users can download.

## Service deliverable

For this deliverable I created an HTTP service to host my frontend and provide backend endpoints.

Node.js/Express HTTP service - done!
Static middleware for frontend - done!
Calls to third party endpoints - I didn't have time to implement this. 😔
Backend service endpoints - Placeholders for login that stores the current user on the server. Endpoints for voting.
Frontend calls service endpoints - I did this use the fetch function.
