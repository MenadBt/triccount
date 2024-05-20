provider "aws" {
  region = var.aws_region
}

resource "aws_key_pair" "deploy" {
  key_name   = var.key_pair
  public_key = file("~/.ssh/id_rsa.pub")
}

resource "aws_security_group" "allow_web" {
  name        = "allow_web"
  description = "Allow web traffic"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = var.instance_type
  key_name      = aws_key_pair.deploy.key_name

  vpc_security_group_ids = [
    aws_security_group.allow_web.id,
  ]

  #user_data = file("upload.sh")

  tags = {
    Name = "triccount-web"
  }
}

resource "aws_eip" "web" {
  instance = aws_instance.web.id
}

