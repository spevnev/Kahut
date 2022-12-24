resource "google_compute_network" "vpc" {
  name = "vpc"
  auto_create_subnetworks = "false"
}

resource "google_compute_subnetwork" "subnet" {
  name = "subnet"
  network = google_compute_network.vpc.name
  ip_cidr_range = "10.10.0.0/24"
}

resource "google_container_cluster" "primary" {
  name = "gke"
  remove_default_node_pool = true
  initial_node_count = 1
  network = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
}

resource "google_container_node_pool" "primary_nodes" {
    name = google_container_cluster.primary.name
    cluster = google_container_cluster.primary.name
    node_count = 1

    node_config {
        oauth_scopes = [
            "https://www.googleapis.com/auth/logging.write",
            "https://www.googleapis.com/auth/monitoring",
        ]
        machine_type = "e2-small"
        tags = ["gke-node", "gke"]
        metadata  = {
            disable-legacy-endpoints = "true"
        }
    }
}