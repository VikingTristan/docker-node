# Docker + node template
## Requirements
- Docker

## Get started
To allow for autocompletes, eslint, etc during development. 
- `cd app1`
- `npm ci`
- `cd ..`
- `docker-compose build && docker-compose up`

This will fire up MongoDB, Mongo Express, a simple node app with some sockets and database connection, and one hello world node app.

### Questions to myself while testing node_modules and docker
- Question 1: If all dependencies are installed within the containers themselves. As a host of the containers and as developer with an IDE, how do I get autocomplete when none of the dependencies are on the host?
  - Conclusion: We need to synchronize host machine repo, with the container's directory through Docker volumes. Not recommended. Just install packages on host instead.

- Question 2: If developers install dependencies on the host machine, and Docker expects to install dependencies and also copy the application over to its containers, the host dependencies will be copied. Which dependencies are the correct ones?
  - Conclusion: Exclude node_modules from being mounted on volumes?

- Question 3: If project A installs dependencies, and project B requires the same dependencies, can project B use project A's dependencies?
  - Conclusion: Mount project a into a shared volume. Then use volume_from on project A (Recommended with read only rights). However, it is quite unlikely that project B creates an image that depends entirely on other images (project A). So this entire scenario isn't very recommended.

- Question 4: Hot module reloading for frontend devs. Since all the packages will be on the container, and we're running libraries such as webpack from the container, will the libraries notice changes in code on the host and reload the app?
  - Conclusion: Don't run frontend apps through containers during development. It _IS_ possible to watch for changes in the container files, then map it etc, but it is a hassle. Not recommended. Do it the other way around, run packages on host, then mount into container.

- Question 5: In our Dockerfiles: Why separately copy package*.json into the container, install packages, THEN copy the rest of the app?
  - Conclusion: A Docker image consists of multiple layers. Docker will detect changes in each layer. If we copied and installed everything in one layer, and did a change in our source code, we would have to install all of the node packages for each build. By separating it into different layers, packages will only be installed if there are changes within the layer that has to do with packages.

#### Troubleshooting
- Nodemon doesn't detect changes on host. 
 - Make sure host mounts source code into container.
 - `nodemon -L` worked for me. This will enable legacy chokidar snacks.

##### There are several approaches on how to deal with node_modules and docker.
- https://burnedikt.com/dockerized-node-development-and-mounting-node-volumes/
- https://rangle.io/blog/docker-for-frontend-devs-custom-docker-images-for-development/
- https://stackoverflow.com/questions/51097652/install-node-modules-inside-docker-container-and-synchronize-them-with-host
- https://petemill.com/writing/docker-compose-node-development/
- https://www.docker.com/blog/keep-nodejs-rockin-in-docker/
