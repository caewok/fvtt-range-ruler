#/bin/bash

rsync -avzh --delete --exclude "*.sh" * /dockerconfig/foundrytest/Data/modules/range-ruler/ 
