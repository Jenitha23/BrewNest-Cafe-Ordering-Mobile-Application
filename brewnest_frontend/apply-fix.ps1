# Run this inside brewnest_frontend folder after backing up your project.
Copy-Item .\package.json .\package.json.backup -Force
Copy-Item .\package-lock.json .\package-lock.json.backup -Force -ErrorAction SilentlyContinue
Copy-Item .\.npmrc .\.npmrc.backup -Force -ErrorAction SilentlyContinue
Copy-Item .\app.json .\app.json.backup -Force
Copy-Item .\babel.config.js .\babel.config.js.backup -Force

# Fix icon imports for Expo Go compatibility
Get-ChildItem -Path .\src -Recurse -Include *.js,*.jsx | ForEach-Object {
  (Get-Content $_.FullName) `
    -replace "from 'react-native-vector-icons/MaterialCommunityIcons'", "from '@expo/vector-icons/MaterialCommunityIcons'" `
    -replace 'from "react-native-vector-icons/MaterialCommunityIcons"', 'from "@expo/vector-icons/MaterialCommunityIcons"' `
    -replace "from 'react-native-vector-icons/Ionicons'", "from '@expo/vector-icons/Ionicons'" `
    -replace 'from "react-native-vector-icons/Ionicons"', 'from "@expo/vector-icons/Ionicons"' |
    Set-Content $_.FullName
}

Write-Host "Backups created. Now copy the fixed files from this zip into the same paths, then run npm install."
