terraform {
  backend "s3" {
    bucket = "tfstate-triccount-prod"
    key    = "terraform/triccount/state"
    region = "eu-west-3"
  }
}

