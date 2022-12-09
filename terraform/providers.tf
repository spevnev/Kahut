provider "google" {
  project = "kahut-project"
  region = "europe-west3"
  zone = "europe-west3-b"
}

terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "4.27.0"
    }
  }

  required_version = ">= 0.14"
}