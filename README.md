# beroman
beroman is a PWA to visually show the waiting time of the US employment based green card.

# Description
beroman monthly scrape the [official site](https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html) to get the US employment based green card waiting time, and visualize the waiting time in a graph by region and employment cagetory. So that green card applicants will have a whole picture of their wait time and trend.

# Getting started
## Installation
- at root, run `pip3 install -r requirements.txt` to install python packages
- go to `frontend` directory, run `yarn install` to install npm packages
- create a `.env` file in the root directory, and put your mongodb service url
  ```
  MONGO_URL=<Your mongodb service url>
  ```
## development
- go to `frontend` directory, run `yarn build` to build client
- at root, run `flask run --port 3004` to start local server
- visit the local server
- scrape the official website to get the PDs, a task can be scheduled to get the data every month, refer to `scripts\scrape_task.sh`

# Demo
https://beroman.utticus.com/
