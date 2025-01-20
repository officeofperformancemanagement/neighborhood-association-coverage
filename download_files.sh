#!/bin/sh -e

# download neighborhood association boundaries
curl https://www.chattadata.org/resource/dxzz-idjy.geojson > ./data/neighborhood-association-boundaries.geojson

# download city council districts (which is used as city boundaries)
curl https://internal.chattadata.org/resource/5t2x-jnde.geojson > ./data/city-council-districts.geojson

# wait for cache to warm up
sleep 5
