# Developer's Reference

[Link to the Site](https://mspiess.github.io/Developer-s-Reference/)

During my work as a Software Developer I try to support any claims made with appropriate sources.
Referencing books is fine, but one cannot assume that others own said books or will obtain them.
This site is my attempt of providing an accessible resource of the various things I'd reference.

## Local Development

The site is built with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

If you have [installed](https://squidfunk.github.io/mkdocs-material/getting-started/) Material for MkDocs, you can start the development server with the following command:

```shell
mkdocs serve
```

Otherwise, you can use Docker:

```shell
docker run --rm -it -p 8000:8000 -v ${PWD}:/docs squidfunk/mkdocs-material
```
