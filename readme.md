# OHM delivery 

This repository is a private clone of the Urbantz ohm-delivery test project: 
https://github.com/urbantz-logistics/ohm-delivery

## Get started 

To run the project, execute the original commands: 

- To run the backend: `cd server ; npm start`
- Tun run the frontend: `cd web; npm start`

The project allows a customer to find its parcel, using the tracking ID. 
You can for instance use: 1e62adfe

To run the UI as a driver, use the driver tracking ID:
50f91bafbb

## Features 

- Customers can fetch their parcel status using the tracking ID 
- Drivers can log using their driver tracking ID 
- Customers can see the status of a parcel 
- Drivers can change the status of a parcel 
  - Using a predefined flow 
  - And, add a rejection reason if the client does not accept a parcel 
- Customers and drivers can also both add comments


## Main development decisions 

- I decided to use a different tracking code for the driver to have a passwordless authentication system that does not require drivers to have an account, but keep protecting the user from updating the status of the parcel.
- I have introduced a new structure for backend (using controller/registries + unit tests) and frontend styling (using BEM structure), but did not change anything on the angular side (no components, no angular upgrade, to mimic the integration into an existing angularJS V1 codebase without components)

There would be also many other improvements that I would have loved to bring, but did not do, for timing reason. 
I think it could be interesting to explore tracks such as: 
- Using model classes, shared between the front and the backend 
- Introducing services in the frontend, for business logic 
- Using SCSS preprocessor for styling

## Screenshots 

If you'd like to have a preview of the project, you can have a look at the screenshots in the screenshots/ folder. 


