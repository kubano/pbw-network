#!/bin/bash
export NODE_OPTIONS="--no-deprecation"
export ORYX_DISABLE_NODEJS_VERSION_CHECK="true"

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Run the build command
npm run build
