#!/bin/bash

#################
#### BACKEND ####
#################
sleep 1

# Update the package list
sudo apt update
sleep 1

sudo apt install -y python3-pip
sleep 1

# Clone repo
sudo git clone https://gitlab.com/menadmgbb/triccount.git

# Setup backend environment
cd triccount/back
sudo pip install -r requirements.txt

# Setup backend service
sudo cat > /etc/systemd/system/mybackend.service << EOF
[Unit]
Description=My FastAPI Backend

[Service]
WorkingDirectory=/home/ubuntu/triccount/back
ExecStart=/usr/bin/python3 main.py
User=ubuntu
Restart=always

[Install]
WantedBy=multi-user.target
EOF


sudo systemctl daemon-reload
sudo systemctl start mybackend.service
sudo systemctl enable mybackend.service
sudo systemctl status mybackend.service


#################
#### FRONTEND ####
#################

cd ..

# Install nodejs, npm and nginx
sudo curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs

sleep 1

sudo apt-get install -y npm
sudo apt-get install -y nginx

# Install dependencies and build production files
cd front
sudo npm install
sudo npm run build

sleep 1

# Move frontend files to /var/www/triccount-imali/html
sudo mkdir -p /var/www/triccount-imali.fr/html

sudo cp -r build/* /var/www/triccount-imali.fr/html

# Setup frontend service
sudo mv myreactapp.conf /etc/nginx/conf.d/

sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx
