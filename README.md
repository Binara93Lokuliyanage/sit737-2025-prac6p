# Kubernetes Dashboard Setup with Docker Desktop on Windows

This guide outlines the steps taken to set up and access the Kubernetes Dashboard on a Windows machine using Docker Desktop and to deploy a basic pod, replica set, and deployment.

## Prerequisites

- Docker Desktop installed and running
- Windows 10/11 with Virtualization enabled
- Internet connection

---

## Steps

### 1. Enable Windows Hypervisor Platform

Enable **Windows Hypervisor Platform** by following these steps:

1. Open **"Turn Windows features on or off"**
2. Check the box for **Windows Hypervisor Platform**
3. Restart your computer if prompted

---

### 2. Enable Kubernetes in Docker Desktop

1. Open **Docker Desktop**
2. Go to **Settings > Kubernetes**
3. Check **Enable Kubernetes**
4. Wait for Kubernetes to start (you'll see a green status indicator when it's ready)

---

### 3. Deploy Kubernetes Dashboard

Apply the Kubernetes Dashboard manifest using the following command:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml
```

---

### 4. Create Admin User and Bind Role

#### Step 1: Create the Admin User

Create a file named `dashboard-adminuser.yaml` and add the provided code (from your workshop slides). Then, run:

```bash
kubectl apply -f dashboard-adminuser.yaml
```

#### Step 2: Create Cluster Role Binding

Create a file named `cluster_role_binding.yaml` with the provided code. Then, execute:

```bash
kubectl apply -f cluster_role_binding.yaml
```

---

### 5. Access the Kubernetes Dashboard

Start the Kubernetes proxy server using:

```bash
kubectl proxy
```

Then open the following URL in your browser:

```
http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
```

---

### 6. Generate Login Token

To access the dashboard, generate a login token for the `admin-user`:

```bash
kubectl -n kubernetes-dashboard create token admin-user
```

Copy the token and paste it into the dashboard login page.

---

### 7. Deploy Resources (Pod, ReplicaSet, Deployment)

Use the sample YAML code provided in your workshop slides to create:

- A **Pod**
- A **ReplicaSet**
- A **Deployment**

Apply each YAML file using:

```bash
kubectl apply -f <filename>.yaml
```

---

## Conclusion

You now have a functional Kubernetes Dashboard running on your local machine with Docker Desktop. You can manage and monitor your Kubernetes resources using the Dashboard UI.