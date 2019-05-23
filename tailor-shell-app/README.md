#### Install Go and git, Download Skipper from github

```bash
sudo yum install -y golang git
go version
```

#### Create workspace go
```bash
mkdir ws
cd ws
sudo vim ~/.bashrc
export GOPATH=$(pwd)
export PATH=$PATH:$GOPATH/bin
ESC + : + wq! + ENTER
```
#### Install eskipper


```bash
git clone https://github.com/zalando/skipper
cd skipper
sudo GO111MODULE=on go get github.com/zalando skipper/...
```

#### Running project

```bash
git clone https://github.com/adrianlemess/poc-router-micro-fronts

cd poc-router-micro-fronts

npm install

# starting tailor
npm start 

# starting skipper
npm run start-skipper
``` 