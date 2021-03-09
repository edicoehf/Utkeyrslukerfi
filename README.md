# Utkeyrslukerfi
![example event parameter](https://github.com/edicoehf/Utkeyrslukerfi/actions/workflows/Backend.yml/badge.svg?event=pull_request)
Lokaverkefni gert í samstarfi og fyrir Edico af nemendum í Háskólanum í Reykjavík

Ná í migrations pakkann
dotnet tool install --global dotnet-ef

Uppfæra migrations pakkann
dotnet tool update --global dotnet-ef

Búa til migrations
dotnet ef migrations add InitialCreate

uppfæra migrations
dotnet ef database update
