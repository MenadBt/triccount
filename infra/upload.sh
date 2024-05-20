#!/bin/bash

#################
#### BACKEND ####
#################
echo "SETUP BACK"

sleep 1

echo "Update the package list"
sudo apt update
sleep 1

echo "Install python3 pip"
sudo apt install -y python3-pip
sleep 1

echo "Clone repo"
sudo git clone https://gitlab.com/menadmgbb/triccount.git

echo "Setup backend environment"
cd triccount/back

sudo apt install python3.10-venv -y
sudo python3 -m venv .venv
source .venv/bin/activate
sudo python3 -m pip install -r requirements.txt
# sudo pip install -r requirements.txt

echo "Setup backend service"
sudo cp mybackend.service /etc/systemd/system/

sudo systemctl daemon-reload
sudo systemctl start mybackend.service
sudo systemctl enable mybackend.service
sudo systemctl status mybackend.service


#################
#### FRONTEND ####
#################
echo "SETUP FRONT"
cd ..

echo "Install nodejs, npm and nginx"
sudo curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs

sleep 1

sudo apt-get install -y npm
sudo apt-get install -y nginx

echo "Install dependencies and build production files"
cd front
sudo npm install
sudo npm run build

sleep 1

echo "Move frontend files to /var/www/triccount-imali/html"
sudo mkdir -p /var/www/triccount-imali.fr/html

sudo cp -r build/* /var/www/triccount-imali.fr/html

echo "Setup frontend service"
sudo mv myreactapp.conf /etc/nginx/conf.d/

sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx

sudo systemctl status mybackend.service
sudo systemctl status nginx
