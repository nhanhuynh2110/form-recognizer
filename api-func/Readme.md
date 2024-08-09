## setup PG
sudo docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres -v /var/lib/postgresql/data:/var/lib/postgresql/data postgres -N 500

## setup azurite
sudo docker run -p 10000:10000 -p 10001:10001 -p 10002:10002     mcr.microsoft.com/azure-storage/azurite