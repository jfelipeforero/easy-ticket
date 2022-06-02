## Description

This project is part of a course that can be found at the following URL: https://www.udemy.com/course/microservices-with-node-js-and-react/

In this project, an event ticketing website is developed focusing on the backend.

### Technologies used: 

- Node.js / Typescript

- Docker / Kubernetes

- Ingress NGINX

- MongoDB 

- NATS Streaming Service

### Architecture pattern implemented: 

- Microservices

### Data Models

The database design and implementation are done with MongoDB   

## Auth service

It is responsible for the registration of new users, as well as other authorization functions such as sign-in and sign-out.

## Client service (Not part of my implementation) 

Is a service implemented with Next.js(React) which initializes the website and it provides multiple authorization functions on its interface.

## Common Module 

Is an NPM package provided with multiple middlewares and error handlers used along all services, also contains NATS Streaming Service implementation which allows the creation of customized event listeners and event publishers.

### Installation

`npm install @jfftickets/common`

## Infra Directory

It contains all Pod and ClusterIP Service deployments including a MongoDB Memory Server implementation for testing and development purposes, also an ingress-Nginx controller deployment is created which acts as a load balancer and manages the traffic between Kubernetes services and external ones.

## Tickets Service

It is responsible for the creation and update of tickets as well as the retrieving of all tickets available at the moment including the retrieve of a single ticket.

## How to run the code
- Download dependencies (`npm install`) in the following directories:

auth

client

nats-test

tickets

- Create and push docker images to docker hub(for skaffold use) (`docker build -t (yourdockerid)/(nameofthecurrentdirectory) .`) in the following directories:

auth

client

tickets

- Create a kubernetes secret `kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf`

- Run skaffold dev in ticketing directory
## Tests

These tests check for the functionality of the routes using jest, supertest to make fake requests, and a MongoDB memory server for data storage. 


### Auth service tests

- Checks for valid username and password when registering.
- Checks for valid credentials when signing in.
- Checks for valid cookie treatment between client and server.

... among other tests

In the auth service directory enter `npm run test` to run the tests.

### Tickets service tests

- Checks for valid data when creating a new ticket.
- Checks if the current user attempting to update a ticket owns that ticket.
- Checks for correct ticket retrieving of the database when listing all tickets.

... among other tests

In the ticket service directory enter `npm run test` to run the tests.





