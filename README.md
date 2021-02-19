# Docker + node template
## Requirements
- Docker

## Get started
`docker-compose build && docker-compose up`

### My ongoing challenges with node_modules and docker
- Scenario 1: If all dependencies are installed within the containers themselves. As a host of the containers and as developer with an IDE, how do I get autocomplete when none of the dependencies are on the host?
  - Conclusion: We need to synchronize host machine repo, with the container's directory through Docker volumes. Not recommended.

- Scenario 2: If developers install dependencies on the host machine, and Docker expects to install dependencies and also copy the application over to its containers, the host dependencies will be copied. Which dependencies are the correct ones?
  - Conclusion: Exclude node_modules from being mounted on volumes?

- Scenario 3: If project A installs dependencies, and project B requires the same dependencies, can project B use project A's dependencies?
  - Conclusion: Mount project a into a shared volume. Then use volume_from on project A (Recommended with read only rights). However, it is quite unlikely that project B creates an image that depends entirely on other images (project A). So this entire scenario isn't very recommended.

- Scenario 4: Hot module reloading for frontend devs. Since all the packages will be on the container, and we're running libraries such as webpack from the container, will the libraries notice changes in code on the host and reload the app?
  - Conclusion: Don't run frontend apps through containers during development. It _IS_ possible to watch for changes in the container files, then map it etc, but it is a hassle. Not recommended.


#### There are several approaches on how to deal with node_modules and docker.
- https://burnedikt.com/dockerized-node-development-and-mounting-node-volumes/
- https://rangle.io/blog/docker-for-frontend-devs-custom-docker-images-for-development/
- https://stackoverflow.com/questions/51097652/install-node-modules-inside-docker-container-and-synchronize-them-with-host
- https://petemill.com/writing/docker-compose-node-development/
- https://www.docker.com/blog/keep-nodejs-rockin-in-docker/
