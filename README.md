## gatsby template

this project was created using a gatsby starter, to generate a project with the same starter use:

```sh
$> gatsby new myproject https://github.com/fes300/gatsby-mui-template.git
```

## start project

- init git: `git init` (N.B. it is important to do this before the deps install so that husky can write its custom hooks)
- install deps: `yarn`
- rename your project: `make rename name=$(YOUR_WEBSITE_NAME)`
- start project: `yarn start`

### N.B.

`yarn start` triggers the command `netlify dev` that does a lot of things (like injecting the dev env set in netlify backoffice into your local runtime, simulating locally your lambda functions and more)

## Conventions & processes

- [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [trunk based development](https://trunkbaseddevelopment.com/)
