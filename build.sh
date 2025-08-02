#!/bin/bash
export NODE_OPTIONS="--no-deprecation"
export ORYX_DISABLE_NODEJS_VERSION_CHECK="true"

# Run the build command
npm run build
