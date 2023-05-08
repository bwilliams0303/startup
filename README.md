# Pathfinder Second Edition Creature Generator

## Description Deliverable

### Elevator Pitch

Have you ever been struggling to create a custom creature or NPC for your Pathfinder Table Top RPG game? It's such a hassel to get out the rules, get some paper, and create a creature from scratch and can take so long. Wouldn't you rather be spending that time preparing other parts of your next playsession? The creature Generator streamlines this process so you can get back to the Pathfinder preping that you love the most! The Generator will allow you to generate random creature stats or gives you the tools to make your own in minutes. All of your creations will be saved to a database so everytime you login, you can see the creatures you've created. You will also be able to publish your creature onto the forum page where you and your friends can share your creations and download them for yourself.

### Design

<img width="688" alt="Screenshot 2023-05-08 at 2 14 34 PM" src="https://user-images.githubusercontent.com/70551937/236925207-27ef6baa-257a-4a6e-a91c-be0644be0bba.png">

### Key features

* Secure login over HTTPS
* Ability to select create custom creature statistics
* Ability to randomly create creature stats (with the exclusion of actions, items, immunities, resistances, and weaknesses)
* Ability to save creatures to a user's personal database
* Ability to view/edit creatures already saved to a personal database
* Ability to upload creatures to a forum
* Ability to download creatures from a forum
* Ability for a user to lock in their top three
* Ability for admin to create and delete creatures

### Technologies

* HTML - Uses correct HTML structure for application. Four HTML pages (Login, Creature Creation, View User's database, Forum).
* CSS - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
* JavaScript - Provides login, creature stat changes, random stat distribution, stat scaling changes, saving creatures to a DB, download creatures from forum, site navigation.
* Service - Backend service with endpoints for:
  - login
  - retrieving user's personal DB
  - saving to user's personal DB
  - uploading creatures to forums
  - retrieving current forum
* DB - Store users and user's creatures in database.
* Login - Register and login users. Credentials securely stored in database. Can't save or upload creatures unless authenticated.
* WebSocket - As each user uploads a creature, their creature can be seen in the forum and downloaded by other users.
* React - Application ported to use the React web framework.

