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
├── .gitignore
├── .env
```

---

## Configuration Files

The script uses three JSON configuration files located in the configs directory:

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
    "ts-node": "", // Latest stable version
    "dotenv": "" // Latest stable version
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

### 3. gitConfig.json

Defines the .gitignore template used by the project. This configuration file allows for easy customization of ignored files and directories.

```json
{
  "ignore": [
    "# Node Modules",
    "node_modules/",
    "dist/",
    "coverage/",
    "temp/",
    "*.log",
    "",
    "# TypeScript",
    "*.tsbuildinfo",
    "",
    "# Environment variables",
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".env.test",
    "",
    "# IDE-Specific Files",
    ".vscode/",
    ".idea/",
    ".DS_Store"
  ]
}
```

## Additional Files

### 1. .gitignore

A .gitignore file is automatically created based on the configs/gitConfig.json. It prevents unwanted files such as node_modules, build artifacts, and environment variables from being tracked by Git.

Example .gitignore:

```gitignore
# Node Modules
node_modules/
dist/
coverage/
temp/
*.log

# TypeScript
*.tsbuildinfo

# Environment variables
.env
.env.local
.env.development
.env.production
.env.test

# IDE-Specific Files
.vscode/
.idea/
.DS_Store
```

### 2. .env

A blank .env file is created to store environment variables. You can add your sensitive API keys and configuration settings here.

Example .env:

```env
# Add your environment variables here
API_KEY=
DATABASE_URL=
```

---

## Author Detection

```plaintext
    If GitHub is configured:
    • The author field in package.json will use the username from git config --get user.name.

    If GitHub is not configured:
    • The system username will be used as a fallback.
```

---

## Troubleshooting

### Error: “package.json already exists in this directory”

> The script is designed to prevent overwriting existing projects. If you want to reinitialize, manually delete the package.json and other generated files before running the script.

### GitHub username not detected

Ensure Git is installed and your username is set with:

```bash
git config --global user.name "YourGitHubUsername"
```
