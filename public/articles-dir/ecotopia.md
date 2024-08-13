# Ecotopia The Making

![Sample](/example-img.png)

## Example only
A Parallax Enabled Website for Climate Change Awareness with Interactive Mini Arcade Game

The study presents a website focused on raising awareness about climate change. This website is designed to enlighten users about the causes, effects, and possible solutions to climate change.

*Keywords— Climate Change Education, Parallax Website, Parallax Effect, Mini Arcade Game, Information Awareness*

---

## Installation
### Requirements
1. NodeJS 15.x
1. Angular 15.x

The system utilize MEAN stack to build this project. Back-end server is in the *backend* folder.

1. `git clone https://github.com/Karlroxas21/Ecotopia.git`
1. `npm install` at root directory
1. In seperate terminal, `cd backend` and `npm install`
1. Create .env file at *backend* folder with the following:
```
 DB_CONNECTION
 OUTLOOK_USER_AUTH
 OUTLOOK_PW_AUTH
 UPLOAD_DIR
 BASE_URL
 ```

### Angular Configuration
#### Deploying to server
``` 
"replace": "src/environments/environment.ts",
"with": "src/environments/environment.development.ts"
"defaultConfiguration": "development"
```
### Production
```
"replace": "src/environments/environment.development.ts",
"with": "src/environments/environment.ts"
"defaultConfiguration": "production"
```
