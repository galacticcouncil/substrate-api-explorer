# Project setup

1.  Install [node.js](https://nodejs.org/en/)
2.  Clone the repository
3.  Open terminal and navigate to the project folder `cd path/to/project`
4.  Run `yarn` to install project dependencies, if you don't have it, you can install it by running `npm i -g yarn`
5.  To run various scripts of the project:
    - `yarn dev` to start localhost and run the project locally in dev mode (will run at `localhost:8080`)
    - `yarn storybook` to start Storybook (will run at `localhost:6006`)
    - `yarn build` to build the production version of the project
    - `yarn lint` to check the code, if this won't pass, the code won't be able to be built

**IMPORTANT!** Make sure to:

1.  Use [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) and have the `Editor: Format On Save` setting in VSCode turned on
2.  Use blueprints for file generation

to keep the code consistent.

# Using blueprints

Blueprints offer the functionality of automatic file generation. They save time and ensure that the file structure will follow the project standards.

### Setup

1.  Install the [Blueprint](https://marketplace.visualstudio.com/items?itemName=teamchilla.blueprint) addon for VSCode
2.  Go to settings in VSCode (`cmd`+`,` on Mac or `ctrl`+`,` on Win/Linux)
3.  Search for "blueprint"
4.  Click `Edit in settings.json`
5.  Add the path to the Blueprint templates folder into `settings.json` - `"blueprint.templatesPath": [ "path/to/project/blueprints" ]`:
    - If you have only one project in your VSCode workspace, a relative path will work - `./blueprints`
    - If you have multiple projects in your VSCode workspace, you need to provide an absolute path - `/Users/blockunison/Documents/api-explorer/blueprints` for example

### Usage

1.  In VSCode, right click on a folder, in which you want to generate a new file from a Blueprint template (for example `/src/components`, `/stories/ui` etc.) and select `New File from Template`
2.  Select one of the available templates
3.  Register the new component in the `index.js` file of the folder, where you created the new component. For example, if you created a new component in `/src/ui`, you need to open `/src/ui/index.js` and export the new component - `export { default as MyNewComponent } from './MyNewComponent`. You don't need to do this with stories since every file with the `.stories.js` extension, located in the `/stories` folder, is autoloaded into Storybook.

### Available templates

- `component`, variables of this template:
  - value - name of the component, can be PascalCase or words separated by spaces (`MyNewComponent` / `my new component`)
- `story`, variables of this template:
  - value - name of the story, can be PascalCase or words separated by spaces (`MyNewComponent` / `my new component`)
  - \$category - what is the category of the component displayed by this story (`layouts` / `components` / `ui`)
