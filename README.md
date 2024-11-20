# neighborhood-association-coverage
Calculates Percentage of Chattanoogans Covered by a Neighborhood Association

## view results at the following link
https://github.com/officeofperformancemanagement/neighborhood-association-coverage/blob/main/results.txt

## how does it work?
- Get boundaries of all the council districts from Chattadata.
- Get population grid from NASA Socioeconomic Data and Applications Center (SEDAC) ([link](https://sedac.ciesin.columbia.edu/data/collection/gpw-v4))
- Calculate the number of people within the city council boundaries using [geoblaze](https://geoblaze.io/)
- Get the boundaries of all the neighborhood associations from Chattadata.
- Calculate the number of people within the neighborhood association boundaries
- Divide the number of people within the neighborhood association boundaries by the number of people within the council districts
- Save the results to [results.txt](https://github.com/officeofperformancemanagement/neighborhood-association-coverage/blob/main/results.txt)
