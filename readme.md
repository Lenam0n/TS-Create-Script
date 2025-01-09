# TypeScript Project Setup Script

A powerful and flexible Node.js script to automate the setup of a TypeScript project. This script initializes a new or existing directory as a TypeScript project, adds all required configuration files, and installs dependencies. It also intelligently assigns the `author` field in the `package.json` using the connected GitHub username or the system username as a fallback.

---

## Features

- Initializes `package.json` with preconfigured values.
- Automatically installs dependencies and devDependencies (fixed versions or latest stable versions based on the configuration).
- Creates a `tsconfig.json` with predefined compiler options.
- Dynamically sets the project author using:
  - GitHub username if available (retrieved from Git configuration).
  - System username as a fallback.
- Adds a basic `src` directory with a starter `index.ts` file (only if the folder doesn't already exist).
- Works directly in the current directory without creating additional folders.

---

## Prerequisites

1. **Node.js** and **npm** installed on your machine.
2. **Git** installed if you want to retrieve the author name from your GitHub configuration.
3. Optionally, configure your GitHub username using:
   ```bash
   git config --global user.name "YourGitHubUsername"
   ```

---

## Project Structure

### After running the script, the directory structure will look like this:

```plaintext
project-directory/
├── package.json
├── tsconfig.json
├── node_modules/
├── src/
│ └── index.ts
```

---

## Configuration Files

The script uses two JSON configuration files located in the configs directory:

### 1. npmConfig.json

Defines the package.json template, including dependencies, scripts, and metadata.

```json
{
  "version": "1.0.0",
  "description": "A TypeScript project",
  "main": "dist/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "build": "tsc"
  },
  "dependencies": {
    "ts-node": "" // Latest stable version
  },
  "devDependencies": {
    "typescript": "4.9.5", // Specific version
    "@types/node": "" // Latest stable version
  }
}
```

### 2. tsConfig.json

Specifies the TypeScript compiler options.

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## Author Detection

    If GitHub is configured:
    •	The author field in package.json will use the username from git config --get user.name.
    If GitHub is not configured:
    •	The system username will be used as a fallback.

---

## Troubleshooting

### Error: “package.json already exists in this directory”

> The script is designed to prevent overwriting existing projects. If you want to reinitialize, manually delete the package.json and other generated files before running the script.

### GitHub username not detected

Ensure Git is installed and your username is set with:

```bash
git config --global user.name "YourGitHubUsername"
```
