# Auction-App _(Official Name TBD)_

#### [Project Proposal](./docs/Project-Proposal.pdf)
### TODOs
- Come up with a name for this application
  - Also update the repository name
- Create Gulp [EC2 deploy task](http://docs.aws.amazon.com/codedeploy/latest/userguide/github-integ-tutorial.html)
- [EC2 Setup](https://scotch.io/tutorials/deploying-a-mean-app-to-amazon-ec2-part-1)


<hr>
<hr>
## Before You Begin
Before you begin we recommend you read about the basic building blocks that assemble a MEAN.JS application:
* MongoDB - Go through [MongoDB Official Website](http://mongodb.org/) and proceed to their [Official Manual](http://docs.mongodb.org/manual/), which should help you understand NoSQL and MongoDB better.
* Express - The best way to understand express is through its [Official Website](http://expressjs.com/), which has a [Getting Started](http://expressjs.com/starter/installing.html) guide, as well as an [ExpressJS](http://expressjs.com/en/guide/routing.html) guide for general express topics. You can also go through this [StackOverflow Thread](http://stackoverflow.com/questions/8144214/learning-express-for-node-js) for more resources.
* AngularJS - Angular's [Official Website](http://angularjs.org/) is a great starting point. You can also use [Thinkster Popular Guide](http://www.thinkster.io/), and [Egghead Videos](https://egghead.io/).
* Node.js - Start by going through [Node.js Official Website](http://nodejs.org/) and this [StackOverflow Thread](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js), which should get you going with the Node.js platform in no time.


## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager. If you encounter any problems, you can also use this [GitHub Gist](https://gist.github.com/isaacs/579814) to install Node.js.
  * Node v5 IS NOT SUPPORTED AT THIS TIME! 
* MongoDB - [Download & Install MongoDB](http://www.mongodb.org/downloads), and make sure it's running on the default port (27017).
* Ruby - [Download & Install Ruby](https://www.ruby-lang.org/en/documentation/installation/)
* Bower - You're going to use the [Bower Package Manager](http://bower.io/) to manage your front-end packages. Make sure you've installed Node.js and npm first, then install bower globally using npm:
*_OR_*
* Docker

```bash
$ npm install -g bower
```

* Sass - You're going to use [Sass](http://sass-lang.com/) to compile CSS during your grunt task. Make sure you have ruby installed, and then install Sass using gem install:

```bash
$ gem install sass
```

* Gulp - You may use Gulp for Live Reload, Linting, and SASS or LESS.

```bash
$ npm install gulp -g
```

* Docker
- (TODO) push docker image to docker hub
Build:
```bash
$ docker build -t auctions-near-me .
```
Run:
```bash
$ docker run -it auctions-near-me
```

