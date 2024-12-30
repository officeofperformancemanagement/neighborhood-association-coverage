import { writeFileSync } from "node:fs";
import geoblaze from "geoblaze";

// fetch boundaries of the City of Chattanooga
const city_council_response = await fetch("https://internal.chattadata.org/resource/5t2x-jnde.geojson");
const city_council_data = await city_council_response.json();
writeFileSync("./data/city-council-districts.geojson", JSON.stringify(city_council_data, undefined, 2));

// initalize population grid
const population_url = "https://s3.amazonaws.com/geotiff.io/gpw_v4_population_density_rev11_2020_30_sec.cog.tif";

// load/cache metadata header of cloud optimize geotiff only once
const georaster = await geoblaze.parse(population_url);

// calculate population within city council districts
const [total] = await geoblaze.sum(georaster, { srs: 4326, geometry: city_council_data }, undefined, { vrm: "minimal", rescale: true });
console.log("total:", total);

console.log("fetching neighborhood association boundaries");
const neighborhood_association_boundaries_response = await fetch("https://www.chattadata.org/resource/dxzz-idjy.geojson", {
  signal: AbortSignal.timeout(60 * 1000) // wait 60 seconds before timing out
});
console.log("fetched neighborhood association boundaries");
const neighborhood_association_boundaries_data = await neighborhood_association_boundaries_response.json();
writeFileSync("./data/neighborhood-association-boundaries.geojson", JSON.stringify(neighborhood_association_boundaries_data, undefined, 2));

// calculation population covered by neighborhood associations
// virtually resamples each pixel into 10,000 smaller sub pixels
const [coverage] = await geoblaze.sum(georaster, { srs: 4326, geometry: neighborhood_association_boundaries_data }, undefined, { vrm: [100, 100], rescale: true });
console.log("coverage:", coverage);

const result = coverage / total;
console.log("precise coverage:", result);

const percentage = Math.round(coverage * 10000 / total) / 100;
console.log("percent coverage:", percentage + "%");

writeFileSync("./results.txt", `
Total Calculated Population:
${Math.round(total).toLocaleString()}

Total Covered Population:
${Math.round(coverage).toLocaleString()}

Percentage of Population Covered by Neighborhood Association:
${percentage}%

`.trim());
