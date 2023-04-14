variable "aws_region" {
  description = "The AWS region to deploy the infrastructure in"
  default     = "us-west-1"
}

variable "instance_type" {
  description = "The EC2 instance type"
  default     = "t2.micro"
}

variable "ami_id" {
  description = "The Amazon Linux 2 AMI ID"
  default     = "ami-0d50e5e845c552faf"
}

variable "key_pair" {
  description = "The EC2 key pair name"
  default     = "triccount-kp-prod"
}


