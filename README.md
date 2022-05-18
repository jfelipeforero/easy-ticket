# Description

This project is part of a course which can be find in the following url: https://www.udemy.com/course/microservices-with-node-js-and-react/

In this project an event ticketing website is developed focusing on the backend.

Technologies used: 

- Node.js / Typescript

- Docker / Kubernetes

- Ingress NGINX

- MongoDB 

- NATS Streaming Service

Architecture pattern implemented: 

- Microservices

### Data Models

The database desing and implementation is done with MongoDB   

## Auth service

It is responsable of the registration of new users, as well as other authorization functions as signin and signout.

## Client service (Not part of my implementation) 

Is a service implemented with Next.js(React) which initialize the website and it provides multiple authoritation functions on its interface.

## Common Module 

Is an NPM package provided with multiple middlewares and error handlers used along all services, also contains NATS Streaming Service implementation which allows the creation of customize listener and publisher events.

### Installation

`npm install @jfftickets/common`

## Infra Directory

It contains all Pod and ClusterIP Service deployments including a MongoDB Memory Server implementation for testing and development purposes, also an ingress-nginx controller deployment is created which acts as a load balancer and manages the traffic between Kubernetes services and external ones.

## Tickets Service

It is responsable of the creation and update of tickets as well as the retrieving of all tickets avaible in the moment including the retrieve of a single ticket



