#!/usr/bin/env node

const fs = require("fs");
const { execSync } = require("child_process");
const os = require("os");

// Importiere Konfigurationen
const npmConfigTemplate = require("../configs/npmConfig.json");
const tsConfig = require("../configs/tsConfig.json");
const gitConfig = require("../configs/gitConfig.json");

// Lese den Projekt-Namen aus den Argumenten (optional)
const args = process.argv.slice(2);
const projectName = args[0]?.toLowerCase() || "my-typescript-project";

// Funktion zum Abrufen des GitHub-Namens
function getGitHubUserName() {
  try {
    const name = execSync("git config --get user.name", {
      encoding: "utf8",
    }).trim();
    return name || null;
  } catch (error) {
    return null;
  }
}

// GitHub-Benutzernamen abrufen, falls vorhanden, ansonsten Systembenutzername verwenden
const author = getGitHubUserName() || os.userInfo().username;

// Schritt 1: Überprüfe, ob das Verzeichnis bereits initialisiert ist
if (fs.existsSync("package.json")) {
  console.error("Error: A package.json already exists in this directory.");
  process.exit(1);
}

// Schritt 2: npm initialisieren
console.log("Initializing npm in the current directory...");
execSync("npm init -y", { stdio: "inherit" });

// Schritt 3: package.json aktualisieren
console.log("Updating package.json...");
const npmConfig = {
  ...npmConfigTemplate,
  name: projectName,
  author,
};
fs.writeFileSync("package.json", JSON.stringify(npmConfig, null, 2));

// Schritt 4: Abhängigkeiten installieren
console.log("Installing dependencies...");
const dependencies = Object.entries(npmConfig.dependencies || {}).map(
  ([pkg, version]) => (version ? `${pkg}@${version}` : pkg)
);
const devDependencies = Object.entries(npmConfig.devDependencies || {}).map(
  ([pkg, version]) => (version ? `${pkg}@${version}` : pkg)
);

if (dependencies.length > 0) {
  execSync(`npm install ${dependencies.join(" ")}`, { stdio: "inherit" });
}
if (devDependencies.length > 0) {
  execSync(`npm install --save-dev ${devDependencies.join(" ")}`, {
    stdio: "inherit",
  });
}

// Schritt 5: tsconfig.json erstellen
console.log("Creating tsconfig.json...");
fs.writeFileSync("tsconfig.json", JSON.stringify(tsConfig, null, 2));

// Schritt 6: .gitignore aus gitConfig.json erstellen
console.log("Creating .gitignore...");
const gitignoreContent = gitConfig.ignore.join("\n") + "\n";
fs.writeFileSync(".gitignore", gitignoreContent);

// Schritt 7: .env-Datei erstellen
console.log("Creating .env file...");
fs.writeFileSync(".env", "# Add your environment variables here\n");

// Schritt 8: Ordnerstruktur erstellen
console.log("Setting up folder structure...");
if (!fs.existsSync("src")) {
  fs.mkdirSync("src");
  fs.writeFileSync("src/index.ts", "// Start your project here");
}

console.log(
  `Setup completed! Your project "${projectName}" is ready in the current directory.`
);
