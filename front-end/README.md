# Listing News Articles

A simple user interface allows users to view the list of articles that data are getting from the back-end service. 

I have used the NextJs framework for frontend development with typescript and reusable components. ([Documentation](https://nextjs.org/docs))

If you do not have installed the docker yet on your machine. ([Visit and install](https://docs.docker.com/))

## Versions
```bash
Next.js v - 14.1.4
ReactJs v - 18.2.0
node v    - 18.17.0
npm v     - 9.6.7
Ubuntu 20.04.5 LTS
Docker version 20.10.12
```

## Installation

### With docker
```bash
1. get a git clone from this repository
2. cp .env.development .env - change the environment variables
3. npm i
4. npm run dev --> run locally
5. npm run start 
6. npm run build --> to create a build

```

### Without docker
```bash
1. get a git clone from this repository
2. cp .env.development .env - change the environment variables
3. docker build -t front-end ./
4. docker run -p 3000:3000 front-end

```