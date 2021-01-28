# Docker + node template
## Requirements
- Docker

## Get started
`docker-compose build && docker-compose up`

### Challenges with node_modules and docker
- Scenario 1: If all dependencies are installed within the containers themselves. As a host of the containers and as developer with an IDE, how do I get autocompletion when none of the dependencies are on the host?

- Scenario 2: If developers install dependencies on the host machine, and Docker expects to install dependencies and also copy the application over to its containers, the host dependencies will be copied. Which dependencies are the correct ones?

- Scenario 3: If project A installs dependencies, and project B requires the same dependencies, can project B use project A's dependencies?


#### There are several approaches on how to deal with node_modules and docker.
- https://burnedikt.com/dockerized-node-development-and-mounting-node-volumes/