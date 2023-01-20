#!/bin/sh

#################
#### BACKEND ####
#################

# Update the package list
sudo apt update
sudo apt install -y python3-pip

# Clone repo
git clone https://gitlab.com/menadmgbb/triccount.git

# Setup backend environment
cd triccount/back
pip install -r requirements.txt

# Setup backend service
sudo cat > /etc/systemd/system/mybackend.service << EOF
[Unit]
Description=My FastAPI Backend

[Service]
WorkingDirectory=/home/ubuntu/triccount/back
ExecStart=/usr/local/bin/uvicorn main:app --host 0.0.0.0 --port 8080
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
curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt-get install -y nodejs

sudo apt-get install -y npm
sudo apt-get install -y nginx

# Install dependencies and build production files
cd front
sudo npm install
sudo npm run build

# Move frontend files to /var/www/triccount-imali/html
sudo mkdir -p /var/www/triccount-imali.fr/html

sudo cp -r build/* /var/www/triccount-imali.fr/html


# Setup frontend service
sudo cat > /etc/nginx/conf.d/myreactapp.conf << EOF
server {
    listen 80;
    server_name triccount-imali.fr;

    root /var/www/triccount-imali.fr/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
EOF

sudo nginx -t
sudo systemctl restart nginx
sudo systemctl status nginx

####



# sudo cat > /etc/nginx/sites-enabled/triccount-imali << EOF
# server {
#     listen 80;
#     server_name triccount-imali.fr;

#     root /var/www/triccount-imali.fr/html;
#     index index.html index.htm;

#     location / {
#         try_files $uri $uri/ /index.html;
#     }

# }
# EOF