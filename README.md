# Gitnore

A simple .gitignore file creator.

## Features

- Fetch Gitignore Files: Automatically fetches .gitignore templates from the official [GitHub repository](https://github.com/github/gitignore).
- Multiple Configurations: Supports combining multiple .gitignore configurations in a single file.
- Easy to Use: Simplifies the process of adding .gitignore files to your projects with a single command.

## Installation

You can use gitnore without installation via npx. To install it globally, you can run:

```bash
npm install -g gitnore
```

## Usage
### Add a .gitignore for Node.js:

```bash
npx gitnore Node
```

### Add multiple configurations:

```bash
npx gitnore Node VisualStudioCode
```

This will create a .gitignore file with configurations for both Node.js and Visual Studio Code.

### Available Technologies

This project makes HTTP requests to this repo to fetch the desired .gitignore configuration. The names must match the available templates in the repository. Some examples include:
- Node
- VisualStudioCode
- Python
- Java
- JetBrains (inside the Global/ folder)
- Phoenix (inside the community/Elixir/ folders)

## Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Versioning

We use SemVer for versioning. For the versions available, see the tags on this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

This tool relies on the [github/gitignore](https://github.com/github/gitignore) repository to fetch templates.

