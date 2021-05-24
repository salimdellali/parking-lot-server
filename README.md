# NASACADEMY Backend Challenge - Parking Lot Management

## Scripts

- `npm start` : start the server
- `npm devserver` : start the server in dev mode (restart the server on each save)
- `npm test` : run unit and integrations tests

## Project structure

- `api/` : folder containing the RESTful API routes
- `helpers/` : folder containing code and functionality to be shared by different parts of the project
- `middlewares/` : folder containing Express middlewares which process the incoming requests before handling them down to the routes, currently holds the Rate Limiter middleware
- `models/`: folder containing Parking Lot Singleton Model, ensures that the same instance of the the Parking Lot class is used accross the project
- `tests/`: folder containing unit and integration tests, used to test the code in other folders
- `.env` : file holding the parking lot size variable, has to be positive and non null number
- `server.js`: file that initialize the server and glues everything together
- `package.json`: file that remembers all packages that the server depends on and their versions

## Server configuration

- `PARKING_LOT_SIZE` variable in `.env` file : input a positive non null number to create a parking lot size of your choice, initialized to 4
- `WINDOW_SIZE_IN_SECONDS` and `MAX_WINDOW_REQUEST_COUNT` constants in `middlewares/rateLimiter.js` : controls how many requests (`MAX_WINDOW_REQUEST_COUNT`) can be done within the time (in seconds) defined in `WINDOW_SIZE_IN_SECONDS`, initialized to 10 requests possible per 10 seconds

## Before using the server

make sure to follow these conventions:

- `PARKING_LOT_SIZE` variable in `.env` file : input a positive non null number to create a parking lot size of your choice, otherwise an error is thrown and the server will not start
- `carId` : a valid car ID is defined to start with the string `car_` followed by a positive number
  - invalid car IDs examples : `c` | `1` | `car` | `car_` | `car_-1` | `car_1a` | `car_aa`
  - valid car IDs examples : `car_0` | `car_00` | `car_00000` | `car_1` | `car_01` | `car_45` | `car_004500` | ...
- `slotId` : a valid slot ID is defined to start with the string `slot_` followed by a positive non null number
  - invalid slot IDs examples : `s` | `1` | `slot` | `slot_` | `slot_-1` | `slot_0` | `slot_1a` | `slot_aa`
  - valid slot IDs examples : `slot_1` | `slot_2` | `slot_3` | ... | `slot_50` | ...

## Using the server (Hitting the endpoints)

GET and PUT HTTP methods are the only methods used in the project

The server has 4 main usable routes :

- GET `/` : returns in json format the actual state of the parking lot
- PUT `/parkcar/:carId` : with a given valid car ID, park the car and return the appropriate message, or return the appropriate error message
- PUT `/unparkcar/:slotId` : with a given valid slot ID, unpark the car, free up space and return the appropriate message, or return the appropriate error message
- GET `/getcarslotinformation/:id` : with a given valid car ID or valid slot ID, return the parking slot information, or return the appropriate error message

## Last note

I had a lot of fun developing this project, I learned a bunch of stuff along the way, I know I couldn't submit this assignement withing the given 3 days (but I managed to submit the Frontend assignement :P), nonetheless I submitting my work

I'm eager to know the results and to get a response back from you guys

Built with <3 and excitement by Salim Dellali
