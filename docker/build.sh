#!/bin/bash
# runs webpack in react container

NODE_ENV=${1:-production}
echo "Running with NODE_ENV=$NODE_ENV"

# stop and remove the containers if they are running
stop_and_remove_container()
{
    docker stop crypto-portfolio
    docker rm crypto-portfolio
}
stop_and_remove_container || true

# run the crypto-portfolio container
docker run \
    -v $(pwd)/src:/react/src \
    -v $(pwd)/dist:/react/dist \
    -v $(pwd)/docker:/react/docker \
    -v $(pwd)/webpack:/react/webpack \
    --name=crypto-portfolio \
    -e NODE_ENV=$NODE_ENV \
    --publish 3600:3600 \
    --entrypoint=/react/docker/entrypoints/build.sh \
    -t crypto-portfolio