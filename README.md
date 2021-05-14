# Utkeyrslukerfi

![Api deployment](https://github.com/edicoehf/Utkeyrslukerfi/actions/workflows/dotnet-api-cd.yml/badge.svg)
![Api build](https://github.com/edicoehf/Utkeyrslukerfi/actions/workflows/dotnet-api-ci.yml/badge.svg)
![Web build](https://github.com/edicoehf/Utkeyrslukerfi/actions/workflows/react-web-ci.yml/badge.svg)
![Web deployment](https://github.com/edicoehf/Utkeyrslukerfi/actions/workflows/react-web-ci.yml/badge.svg)


## Final Assignment developed by students of Reykjavik University in collaboration with Edico

The product is a system that keeps track of deliveries, it consists of a web page that gives a certain overview for supervisors. It also has an application that allows drivers to keep track of the deliveries they are to deliver. As well as changing the status for the deliveries that specifies their location in the delivery process. Then there is a backend that both of those front ends communicate with.

## Links

Web:
https://utkeyrslukerfi-web.azurewebsites.net/

Backend:
https://utkeyrslukerfiapi.azurewebsites.net/swagger/index.html

Operations Manual:
https://docs.google.com/document/d/1UPDtjVoit0I940uLsjCphrOYEHGYvVtTss3voHoZZUw/edit?usp=sharing

## Setup

Start with cloning the project by running the command below.
```
git clone https://github.com/edicoehf/Utkeyrslukerfi.git
```

### Database

For this project a MySQL database was used and is necessary to continue with the setup, although it is possible to use another SQL version.
If another SQL version is used some small changes need to be made to the Startup file in the Backend.

### Backend

The latest version of .Net is necessary to continue.

Install the .Net entity framework. 
```
dotnet tool install --global dotnet-ef
```

Run the next lines of code in the “Backend/Utkeyrslukerfi.API/Utkeyrslukerfi.API” directory

Initialize the migrations by running the command below. 
```
dotnet ef migrations add InitialMigration
```

Then push those migrations to the database using this command. 
```
dotnet ef database update
```

If any changes are made to the entities in the backend, the database will need to be updated accordingly.
Update the migrations by running the command below
```
dotnet ef migrations add <NameOfMigration>
```

Then push those changes to the database using this command.
```
dotnet ef database update
```

In addition to the setup above multiple configurations can be made to this product and further details can be found in the operations manual accessible through a link in the link section above.

### Web

The web does not need much to be run, only Node js and npm is required.

Therefore the only thing necessary is to run the command below to set up all the packages needed for this project.
```
npm install
```

### App

The same thing goes for the app, both Node js and npm are required. Also, Android Studio needs to be set up correctly to run the app.

Since the application uses Azure Cloud Storage, a storage account must be set up with two conainers, images and signatures.
The access key for the account needs to be added to a .Env file at the root of the project (under UtkeyrslukerfiHandheld). It must contain one variable:
```
REACT_APP_STORAGE_KEY="<INSERT KEY>"
```

Then, under src/constants/index.js there are three constants containing the name of the account and the containers. Those must match the ones in the Storage Account
```
// Azure cloud blob storage
export const AZURE_ACCOUNT_NAME = '<ACCOUNT NAME>'
export const AZURE_CONTAINER_IMAGES = 'images'
export const AZURE_CONTAINER_SINGATUERES = 'signatures'
```

## Contributors

- [Ermir Pellumbi](https://github.com/ertolv)
- [Jóel Snær Garcia Thorarensen](https://github.com/joelsnaer)
- [Margrét Sóley Kristinsdóttir](https://github.com/MaggaSK97)
- [Mikael Máni Jónsson](https://github.com/MikaelMani99)

