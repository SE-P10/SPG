# How to run the application using Docker

1. clone this repo:

```bash
git clone https://github.com/SE-P10/SPG.git
```

2. Enter in the directory and run Docker build:

```bash
docker build -t spg:latest .
```

3. At the end run the image that you just created:

```bash 
docker run -it --rm -p 3000:3000 -p 3001:3001 spg:latest
```

4. Now open your browser and go to:

```url 
http://127.0.0.1:3000/
```
