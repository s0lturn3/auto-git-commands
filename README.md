# auto-checkout

> Run Git commands across multiple repositories simultaneously — from a single interactive terminal prompt.

---

## Overview

`auto-checkout` is a Node.js CLI tool that lets you execute Git operations on several local repositories at once. Instead of switching directories and repeating the same commands, you pick your repos, pick your action, and the script handles the rest — with colored, readable output for each result.

Built with [`inquirer`](https://github.com/SBoudrias/Inquirer.js) for interactive prompts and [`chalk`](https://github.com/chalk/chalk) for terminal output.

---

## Current Features

- **Checkout + Pull** — switch to a branch and pull the latest changes across all selected repos
- **Pull only** — pull the current/target branch without switching
- **Multi-repo selection** — choose which repositories to target from a configured list
- **Color-coded output** — clear per-repo success/error feedback in the terminal

---

## Requirements

- Node.js >= 18
- Git installed and available in `PATH`
- Repositories already cloned locally

---

## Installation

```bash
git clone <repo-url>
cd auto-checkout
npm install
```

---

## Configuration

Define your root path for the repos in the config file:

```js
// config.js
export const config = {
  root: 'C:/path/to/your/repos',
}
```

---

## Usage

```bash
node src/index.js
```

*Alternatively, you can run the `run.bat` file for Windows or create a shell script for Unix-based systems to simplify execution.


The CLI will walk you through:

1. **Select repositories** — choose one or more repos from the configured list
2. **Select operation** — `Checkout + Pull` or `Pull only`
3. **Enter branch name** — the target branch to checkout/pull (defaults to 'DEV')
4. Results are printed per repo with success ✔ or error ✖ indicators

---

## Example Output

```
? Select repositories: (Press <space> to select)
 ◉ frontend
 ◉ backend
 ◯ shared-lib

? Operation: Checkout + Pull
? Branch name: DEV

[frontend]   ✔ Checked out and pulled 'DEV' successfully
[backend]    ✔ Checked out and pulled 'DEV' successfully
```

---

## Project Structure

```
auto-checkout/
├── src/
│   ├── commands/
│   │   ├── checkout.js   # Checkout logic
│   │   └── pull.js       # Pull logic
│   ├── utils/
│   │   ├── output.js     # Chalk-based output helpers
│   │   └── repos.js      # Repo management (e.g., loading config)
│   ├── config.js         # General configuration file (e.g., repo list)
│   └── index.js          # Entry point, prompt orchestration
├── .gitignore
├── package.json
├── README.md
└── run.bat               # Windows batch file for easy execution
```

---

## Roadmap

### In Progress

- [X] **Checkout to tag** — support checking out specific Git tags in addition to branches
- [ ] **Checkout to new branches** — allow users to create and switch to new branches across multiple repos in one step

### Planned

- [ ] **Dirty working tree handling** — if a repo has uncommitted changes during checkout, prompt the user to choose between: stash, discard, or skip that repo
- [ ] **Stash + checkout + stash pop** — automated flow when stashing is the preferred option
- [ ] **Fetch before checkout** — optionally run `git fetch` to ensure the target branch/tag is available locally before switching
- [ ] **Push support** — push current branch across all selected repos
- [ ] **Status overview** — show `git status` for all configured repos at a glance
- [ ] **Custom command runner** — free-form Git command executed across selected repos (power-user mode)
- [ ] **Parallel execution** — run commands concurrently rather than sequentially, with aggregated output
- [ ] **Config via CLI flags** — support passing repos and commands as arguments for scripting/CI use

---

## Contributing

This is a personal tooling script, but suggestions and PRs are welcome.

---

## License

MIT