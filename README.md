# Auction-App _(Official Name TBD)_

#### [Project Proposal](./docs/Project-Proposal.pdf)
### TODOs
- Come up with a name for this application
  - Also update the repository name
- Create Gulp [EC2 deploy task](http://docs.aws.amazon.com/codedeploy/latest/userguide/github-integ-tutorial.html)
- [EC2 Setup](https://scotch.io/tutorials/deploying-a-mean-app-to-amazon-ec2-part-1)
  

<hr>

## Getting Started:
### Installs
- Download the latest stable release of [Node](https://nodejs.org/en/)
- Download the latest version of [Git] (https://git-scm.com/download/win)
- Install [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
- Download the latest version of [2.7.x Python](https://www.python.org/downloads/)
- Download [Visual Studio Express 2013 For Windows Desktop](https://www.microsoft.com/en-us/download/details.aspx?id=44914) (Wired connection recommended).
    - Be sure to install the 2013 version, last I checked the latest version doesn't work properly with Node._
- Download [Intellij IDEA OR Webstorm](https://www.jetbrains.com/student/)
  - You can easily get a student license which takes a few days - in the mean time use the 30 day free trial

### Setting Up Your Machine for [MEAN](http://mean.io) Development
#### Using Node Package Manager, install MEAN globally with the following commands
 - ```npm i -g mean-cli@latest``` _(if you encounter errors, run cmd.exe as an administrator)_

### Installing Node Modules (dependencies)
 - ```npm i -g gulp```
 - ```npm i -g bower```
 - ```npm i ```
 
 
### Starting the app
#### Run the following commands
 - ```gulp```
_The app will be served locally [here](http://localhost:3000/)_


### Troubleshooting

#### Update NPM, Bower or Gulp
Sometimes you may find there is a weird error during install like npm's *Error: ENOENT*. Usually updating those tools to the latest version solves the issue.

* Updating NPM:
```
npm update -g npm
```

* Updating Gulp:
```
npm update -g gulp
```

* Updating Bower:
```
 npm update -g bower
```

#### Cleaning NPM and Bower cache
NPM and Bower has a caching system for holding packages that you already installed.
We found that often cleaning the cache solves some troubles this system creates.

* NPM Clean Cache:
```
 npm cache clean
```

* Bower Clean Cache:
```
 bower cache clean
```

#### Installation problems on Windows 8 / 8.1
Some of Mean.io dependencies uses [node-gyp](https://github.com/nodejs/node-gyp) with supported Python version 2.7.x. So if you see an error related to node-gyp rebuild follow next steps:

1. install [Python 2.7.x](https://www.python.org/downloads/)
2. install [Microsoft Visual Studio C++ 2012 Express](http://www.microsoft.com/en-us/download/details.aspx?id=34673)
3. Run NPM update

```
 npm update -g
```

## Technologies
### For more information, go [here](./docs/MEAN-README.MD)

### The MEAN stack

MEAN is an acronym for *M*ongo, *E*xpress.js , *A*ngular.js and *N*ode.js

<dl class="dl-horizontal">
<dt>MongoDB</dt>
<dd>Go through MongoDB Official Website and proceed to its Great Manual, which should help you understand NoSQL and MongoDB better.</dd>
<dt>Express</dt>
<dd>The best way to understand express is through its Official Website, particularly The Express Guide; you can also go through this StackOverflow thread for more resources.</dd>
<dt>AngularJS</dt>
<dd>Angular's Official Website is a great starting point. CodeSchool and google created a <a href="https://www.codeschool.com/courses/shaping-up-with-angular-js">great tutorial</a> for beginners, and the angular videos by <a href="https://egghead.io/">Egghead</a>.</dd>
<dt>Node.js</dt>
<dd>Start by going through Node.js Official Website and this StackOverflow thread, which should get you going with the Node.js platform in no time.</dd>
</dl>

### Additional Tools
* <a href="http://mongoosejs.com/">Mongoose</a> - The mongodb node.js driver in charge of providing elegant mongodb object modeling for node.js
* <a href="http://passportjs.org/">Passport</a> - An authentication middleware for Node.js which supports authentication using a username and password, Facebook, Twitter, and more.
* <a href="http://getbootstrap.com/">Twitter Bootstrap</a> - The most popular HTML, CSS, and JS framework for developing responsive, mobile first projects.
* <a href="http://angular-ui.github.io/bootstrap/">UI Bootstrap</a> - Bootstrap components written in pure AngularJS


## CLI
### Overview

The MEAN CLI is a simple Command Line Interface for installing and managing MEAN applications. As a core module of the Mean.io project, it provides a number of useful tools to make interaction with your MEAN application easier, with features such as: scaffolding, module creation and admin, status checks, and user management.
```
mean
mean --help
mean help
```
  <code>mean help</code> can also be used in conjunction with any command to get more information about that particular functionality. For example, try <code>mean help init</code> to see the options for init
```
mean help [command]
```
### Users

 <p>Information can be display for a specific customer via <code>mean user email</code>. Email is required. User roles can be assigned or removed with the <code>--addRole (or -a)</code> and <code>--removeRole (or -r)</code> options, respectively.</p>
  <p>For example, the <i>admin</i> role is required to edit tokens.</p>

```
   mean user <email>
   mean user <email> --addRole <role>;
   mean user <email> --removeRole <role>;
```
