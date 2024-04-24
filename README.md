[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/MnOQKepF)
# assignment-5-cicd
[![Build and Deploy](https://github.com/cscie114/assignment-5-cicd-luthian/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/cscie114/assignment-5-cicd-luthian/actions/workflows/build-and-deploy.yml)

### Submission for Assignment 5 - CI/CD and Netlify
#### Harvard CSCI E-114 Web Application Development with Jamstack

This is my submission for Assignment 5. The project implements a variant of the first assignment which displayed a poster and some data about a specific movie. It used the **omdbapi.com** site to retrieve that data and was built in the static site generator, [Eleventy](https://www.11ty.dev/]).

To this, I've added both an edge and a serverless function hosted on Netlify, as is the site itself. The edge function just returns some geolocation information provided by the edge server itself and the serverless function returns information on the Mars Curiousity Rover for today date (UTC) in 2021.

Please follow the steps below to build and view this website.

* Clone the GitHub repo at https://github.com/cscie114/assignment-5-cicd-luthian/ into the directory of your choice. This will be referred to as the `root` directory in the documentation.

Time passes...

* To host the site on Netlify, you'll need a Netlify account. So far, the project hasn't required more resources than the free tier makes available. You can start the process [here](https://www.netlify.com/pricing/).
* Once you've got a Netlify account, you will need to create a site; click on the **Sites** link in the sidebar and then on the big green button **Add New Site**.
* To be able to build and upload this projec to your own Netlify site, you'll need an Personal Account Token and the Site Name.
  * The Site ID can be found in the **Site Configuration** section for the site created above. Select **Site Configuration** from the sidebar and save the _Site Name_.
  * To get the Personal Access Token, click on icon in the upper right and select **User Settings**. In the middle list, select **Applications**. In the Personal Access Tokens section, click **New Access Token** and follow the directions. _Please save the token as you will **not** be able to recover it_
* In order to access the OMDB site, you'll need an API key. Follow these [directions](https://www.omdbapi.com/apikey.aspx) to apply for said key. Choose either an Patreon supporter or free key.
* In order to display movie info, you'll need to pick a movie. The easiest way to do this to use [IMDB](https://www.imdb.com) and search for your favourite movie. Then select the value from the URL that starts with `tt`; for example, `tt1440129` is the ID of **Battleship**
* In order to access the NASA site, you'll need another API key. Follow these [directions](https://api.nasa.gov/) to apply for said key. The key is free.

More time passes...

* Once you have the keys, Name and Token, you'll need to create a file at the root of the project named `.env`; yes, that's a dot at the beginning of the file name. Note that this file is listed in `.gitignore` so `git` won't track it or allow you to check it in. Once created, add the keys in the following format:
 `KEY_NAME=<Key value here>`. You want the following values
  * `MOVIE_API_KEY="Your OMDB API key"`
  * `MOVIE_ID="ttXXXXXX"`
  * `NETLIFY_ACCESS_TOKEN="Your PAT from Netlify"`
  * `NETLIFY_SITE_ID="The site name"`
  * `NASA_API_KEY="Your NASA API key"`

  These will be readable when the code is built. This is done so that the keys are never included in anything checked into the repo.
* Now install all the dependencies required to create the website. In the root directory do `npm install` to install everything. You can safely ignore any warnings or vulnerabilities.

Still more time passes...

* Since part of the assignment is to use GitHub actions to test and deploy the site, the next step is configure the GitHub repo. Specifically, we have to tell GitHub about those keys.
  * Open your repo in a web browser and select the **Settings** icon at the end of the items in the menu.
  * In the sidebar, under _Security_, select **Secrets and variables**.
  * In the menu that just opened, select **Actions**
  * In the _Repository secrets_ section, add the keys and values from your `.env` file.

Still more time passes...

* The next step is to add the same secrets to Netlify. Fortunately, Netlify makes this fairly easy.
  * Click on **Site Configuration** in the left sidebar. From the middle section, select **Environment variables**. Click the green **Add a variable** button and select, **Import from an .env file**.
  * Copy and paste the contents of the `.env` file you created above into the text box and select **Import Variables**. You can leave the _Scopes_ and _Deploy contexts_ at the defaults.

Finally...

* To actually deploy the site to Netlify, go to the GitHub page for this repo and click on **Actions** in the menu list. Select the **Build and Deploy** workflow and click the **Run Workflow** button. Follow the directions and the action should run and build and deploy the site to Netlify.
* You can monitor the workflow from that page. When the build is finished, go to Netlify and open your site.

My Netlify site is at https://rad-sable-6a1d2d.netlify.app/

