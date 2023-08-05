BUILD_VERSION=$(shell npm pkg get version 2> /dev/null | sed 's/"//g')
echo Printing Build Version
echo $BUILD_VERSION