# TyriaTracker

Welcome to Tyria Tracker, a Guild Wars 2 helper app.
It allows a User to create an account (not on live version) with a Guild Wars 2 API key to keep track of the daily and weekly tasks that are avaiable in the game
It also features a trading post view that allows the user to search for item names, view buy, sell, demand, supply, profit and ROI data in an easy to use UI.
The trading post also allows you to check items history data for the last 24 hours by clicking on an item name.

You can find Tyria tracker here: https://tyria-tracker.vercel.app
This is a stripped down version that does not require a log in or a guild wars 2 API key and uses a pre determined account to show the capabilities of the application.


Requirements:
  
If wanting to run locally this will require to also clone the backend application - https://github.com/Lumina97/TyriaTracker_Backend

  -Node.js and NPM 
  
How to install:
 
 - Clone repository to local machine
 - Run `npm i`
 - Run `npm run dev`
 - Create a `.env` file and add : `VITE_API_URL="http://localhost:3030/"` (this will require you to also run the backend at the same time
 - This will start up a local host of Tyria Tracker


How to use:
-simply go to `localhost:3030` and explore!
