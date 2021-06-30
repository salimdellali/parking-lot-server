# NASACADEMY Backend Challenge - Parking Lot Management

## Quick start of the application usage

[Using the server (Hitting the endpoints)](#using-the-server-hitting-the-endpoints)

## Table of contents

- [Why this project ?](#why-this-project)
- [Project description](#project-description)
- [Scripts](#scripts)
- [Project structure](#project-structure)
- [Server configuration](#server-configuration)
- [Before using the server](#before-using-the-server)
- [Using the server (Hitting the endpoints)](#using-the-server-hitting-the-endpoints)
- [Last Note](#last-note)

## Why this project ?

I built this project as part of an assignement to apply for a Fullstack position.

## Project description

- The project is to create a simple server that manages a parking lot that is rate-limited by the IP Address.
- The only allowed packages are `express` with Node.js and `dotenv`, apart from this it's forbidden to use any other libraries or databases.
- 3 main endpoints should be created which are :
  - Park a Car: The Endpoint will be given the car number as input and outputs the slot where it is parked. If the parking lot is full, the appropriate error message is returned.
  - Unpark the Car: This endpoint takes the slot number from which the car is to be removed from and frees that slot up to be used by other cars.
  - Get the Car/Slot Information: This endpoint can take either the slot number or car number and return both the car number and slot number
    for the input.
- Apart from this, the server will rate-limit the number of requests coming in. So, if a user makes more than 10 requests in 10 seconds, we return the appropriate error message.
- Important Note: Implement OWN rate limiter without using any third party library.

## Scripts

- `npm install` : install dependencies
- `npm run postinstall` : after installing the dependencies, compile the project Typescript `src/` folder to Javascript `dist/` folder
- `npm start` : start the server
- `npm run devserver` : start the server in dev mode (restart the server on each save)
- `npm run test` : run unit and integration tests

## Project structure

- `src/` : Typescript source folder
  - `api/` : folder containing the RESTful API routes
  - `helpers/` : folder containing code and functionality to be shared by different parts of the project
  - `middlewares/` : folder containing Express middlewares which process the incoming requests before handling them down to the routes, currently holds the Rate Limiter middleware
  - `models/` : folder containing Parking Lot Singleton Model, ensures that the same instance of the the Parking Lot class is used accross the project
  - `tests/` : folder containing unit and integration tests, used to test the code in other folders
  - `server.js` : file that initialize the server and glues everything together
- `.env` : file holding the parking lot size variable, has to be positive and non null number
- `jest.config.js` : jest config file for Typescript support
- `tsconfig.json` : Typescript config file
- `package.json`: file that remembers all packages that the server depends on and their versions

## Server configuration

- `PARKING_LOT_SIZE` variable in `.env` file : input a positive non null number to create a parking lot size of your choice, initialized to 4
- `WINDOW_SIZE_IN_SECONDS` and `MAX_WINDOW_REQUEST_COUNT` constants in `middlewares/rateLimiter.js` : controls how many requests (`MAX_WINDOW_REQUEST_COUNT`) can be done within the time (in seconds) defined in `WINDOW_SIZE_IN_SECONDS`, initialized to 10 requests possible per 10 seconds

## Before using the server

run `npm install` to install dependencies

Since any database usage isn't allowed, the storage of information is volatile, so all information is stored only while the server is running, the data is lost when restarting the server

make sure to follow these conventions:

- `PARKING_LOT_SIZE` variable in `.env` file : input a positive non null number to create a parking lot size of your choice, otherwise an error is thrown and the server will not start
- `carId` : a valid car ID is defined to start with the string `car_` followed by a positive number
  - invalid car IDs examples : `c` | `1` | `car` | `car_` | `car_-1` | `car_1a` | `car_aa`
  - valid car IDs examples : `car_0` | `car_00` | `car_00000` | `car_1` | `car_01` | `car_45` | `car_004500` | ...
- `slotId` : a valid slot ID is defined to start with the string `slot_` followed by a positive non null number
  - invalid slot IDs examples : `s` | `1` | `slot` | `slot_` | `slot_-1` | `slot_0` | `slot_1a` | `slot_aa`
  - valid slot IDs examples : `slot_1` | `slot_2` | `slot_3` | ... | `slot_50` | ...

## Using the server (Hitting the endpoints)

run `npm start` to launch the server, make sure to give the `PARKING_LOT_SIZE` variable in `.env` file a positive non null number

GET and PUT HTTP methods are the only methods used in the project

The server has 4 main usable routes :

- GET `/` : returns in json format the actual state of the parking lot
- PUT `/parkcar/:carId` : with a given valid car ID, park the car and return the appropriate message, or return the appropriate error message
- PUT `/unparkcar/:slotId` : with a given valid slot ID, unpark the car, free up space and return the appropriate message, or return the appropriate error message
- GET `/getcarslotinformation/:id` : with a given valid car ID or valid slot ID, return the parking slot information, or return the appropriate error message

## Last note

Built with <3 and excitement by Salim Dellali
