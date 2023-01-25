provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c94855ba95c71c99"  # Ubuntu 20.04 LTS
  instance_type = "t2.micro"
  key_name      = "my-key-pair"
  tags = {
    Name = "my-ec2-instance"
  }

  user_data = <<EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y python3-pip nginx
              sudo git clone https://gitlab.com/menadmgbb/triccount.git /home/ubuntu/triccount
              sudo cat > /etc/systemd/system/mybackend.service << EOL
              [Unit]
              Description=My FastAPI Backend

              [Service]
              WorkingDirectory=/home/ubuntu/triccount/back
              ExecStart=/usr/bin/python3 main.py
              User=ubuntu
              Restart=always

              [Install]
              WantedBy=multi-user.target
              EOL
              sudo cp /home/ubuntu/triccount/front/myreactapp.conf /etc/nginx/conf.d/
              sudo mkdir -p /var/www/triccount-imali.fr/html
              sudo cp -r /home/ubuntu/triccount/front/build/* /var/www/triccount-imali.fr/html
              cd /home/ubuntu/triccount/back
              sudo pip3 install -r requirements.txt
              sudo systemctl daemon-reload
              sudo systemctl enable mybackend.service
              sudo systemctl start mybackend.service
              sudo systemctl restart nginx
              EOF
}

output "public_ip" {
  value = aws_instance.web.public_ip
}
