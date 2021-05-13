# Utkeyrslukerfi

![Api deployment](https://github.com/edicoehf/Utkeyrslukerfi/actions/workflows/dotnet-api-cd.yml/badge.svg)
![Api build](https://github.com/edicoehf/Utkeyrslukerfi/actions/workflows/dotnet-api-ci.yml/badge.svg)
![Web build](https://github.com/edicoehf/Utkeyrslukerfi/actions/workflows/react-web-ci.yml/badge.svg)
![Web deployment](https://github.com/edicoehf/Utkeyrslukerfi/actions/workflows/react-web-ci.yml/badge.svg)


Lokaverkefni gert í samstarfi og fyrir Edico af nemendum í Háskólanum í Reykjavík

Ná í migrations pakkann
dotnet tool install --global dotnet-ef

Uppfæra migrations pakkann
dotnet tool update --global dotnet-ef

Búa til migrations
dotnet ef migrations add <name>

Uppfæra gagnagrunn með nýju migrations
dotnet ef database update
