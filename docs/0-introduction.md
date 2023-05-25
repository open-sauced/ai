## OpenSauced Chrome Extension Developer Guide

This guide is intended for developers who want to contribute to the OpenSauced Chrome Extension.
It will walk you through the process of adding new components, updating existing components, and the
various design patterns used in the extension.

For instructions on how to install and run the extension locally, see the project [README](../README.md).

## Tech Stack

The extension is built using the [CRXJS Vite Plugin](https://crxjs.dev/vite-plugin/) with [React](https://reactjs.org/) for the extension popup and vanilla [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for background and content scripts.
We use [TypeScript](https://www.typescriptlang.org/) for type checking and [ESLint](https://eslint.org/) for linting.
For styling, we use [Tailwind CSS](https://tailwindcss.com/) and GitHub's design system for injecting styles into the GitHub DOM.

## Index

- [Folder Structure](./1-folder-structure.md)
- [Adding a New Component](#adding-a-new-component)