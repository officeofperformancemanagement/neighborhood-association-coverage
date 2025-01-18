#!/bin/sh -e

# download neighborhood association boundaries
curl --output="./data/neighborhood-association-boundaries.geojson" https://www.chattadata.org/resource/dxzz-idjy.geojson

# download city council districts (which is used as city boundaries)
curl --output="./data/city-council-districts.geojson" https://internal.chattadata.org/resource/5t2x-jnde.geojson
