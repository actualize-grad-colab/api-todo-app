# ToDo API

## Development

### Setup

Ran into some issues relating to npm and suggest using pnpm instead. Chances are
if you don't know the difference, you'll never notice.

```shell
  npx pnpm i{nstall}
```

If you really wan't to pretend nothing's changed, you can run the following
command to alias `npm` to `pnpm` in your shell. This will likely cause you a
headache in 9 months when you completely forget about you npm not being the
real npm.

```shell
  echo 'alias npm=\'npx pnpm\'' >> ~/.zshrc && source ~/.zshrc
```

### Prettier

Formatter

[Prettier](https://prettier.io) formats your code automatically and with
consistency. Actually, it parses/reads the file and re-prints it according to a
set of formatting rules. The difference is subtle, but worth understanding.
Prettier doesn't "change" or "format" or "adjust" your code. Prettier reads the
file and overwrites the entire thing.

> "Prettier enforces a consistent code style (i.e. code formatting that won’t
> affect the AST) across your entire codebase because it disregards the
> original styling by parsing it away and re-printing the parsed AST with its
> own rules that take the maximum line length into account, wrapping code when
> necessary."

Prettier never complains or changes your code. It just reprints it. Set this up
to happen automattically in your editor.

### Typescript

Compiler and Type Checker

[Typescript](https://www.typescriptlang.org) is awesome, but may be a pain in the
butt initially. Here's what GitHub copilot says about it:

_Typescript is a typed superset of JavaScript that compiles to plain
JavaScript. It is a language that is developed and maintained by Microsoft. It
is a strict syntactical superset of JavaScript and adds optional static typing
to the language._

Basically, it allows you to define whether a variable is a string, number,
object, array, etc. It also allows you to define the shape of an object. This
is very useful when you're working with a large codebase or a team of
developers. Its helpful for three reasons:

1. It forces you to think through what you're doing.
2. It helps you catch errors before they happen.
3. It enables better completion, refactoring, and it's self documenting.

IMHO, I think dynamic typing has very few upsides.

### ESLint

Linter

[ESLint](https://eslint.org) is a linter for JavaScript and Typescript. It's
somewhere between a formatter and a compiler. It reads your code and checks it
for errors. It also checks for style issues. It helps keep code consistent and
can help guide you in the right direction. This tool also gets setup in your
editor. It may not be necessary if since we're using Typescript-TBD.

## DB setup

Install [PostgreSQL](https://www.postgresql.org) locally. Use of
[docker](https://www.docker.com/products/docker-desktop/) is recommended but
not necessary. If you choose to use docker then you can use the [official
postgres image](https://hub.docker.com/_/postgres).

```shell
  docker pull postgres

  docker run -d --name todo_app -p 5432:5432 -e POSTGRES_PASSWORD=badpassword postgres

  npx pnpm i

  # Connect to the database and run up migrations

  DATABASE_URL="postgres://postgres:badpassword@localhost:5432/todo_app?sslmode=disable" npx dbmate up
```

It is convenient to use a GUI database client like
[DBVisualizer](https://www.dbvis.com) or
[this plugin](https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres)
for Visual Studio Code.

The postgres client `psql` needs to be installed to run `npm run db: ` commands. This may change.

```shell
brew install libpg &&   echo 'export PATH="/usr/local/opt/libpq/bin:$PATH"' >> ~/.zshrc
```
