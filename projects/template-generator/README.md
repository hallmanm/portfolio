# Master Module

The "**Master Module**" is an application that allows CMS users to dynamically create marketing modules without any engineering efforts. This application was used within <a href="https://www.contentstack.com/" target="_blank">Contentstack</a>.

## Usage
The application is meant to be an "extension" within a headless CMS. Typically, the CMS will import the extension as an iframe. To mimic this, <a href="https://github.com/hallmanm/portfolio/blob/main/projects/template-generator/master-module.html">master_module.html</a> has been included in the index file as an iframe. Certain data has been mocked to show functionality. Be sure to update the commented sections when using within a true CMS.

### Rquirements
* Dependencies
  * Contentstack UI Extension SDK and CSS
  * jQuery

* Content Types
  * Content Type: "Master Module"
  * Content Type: "Templates - Master Module"
  * Extension: "Master Module"
    * To be referenced within each content type listed above

### Extension Data
```javascript
//config
{
  "baseURL": "https://cdn.contentstack.io/",
  "contentType": "templates_master_module",
  "templateEnv": "preview",
  "DEV": {
    "apiKey": "",
    "deliveryToken": ""
  },
  "PROD": {
    "apiKey": "",
    "deliveryToken": ""
  }
}
```

## Integrations with CMS

### Connect with CMS
```javascript
//ex
ContentstackUIExtension.init().then(function (extension) {

}
```

### Build UI
```javascript
//init accepts an object from the CMS form to pre-populate saved content entries.
//If no data is passed, a blank layout will be shown.
init(object);

//ex
init(extensionField.field.getData());
```
### Show/Hide Templates
The "Master Module" can be referenced in multiple places. One is for creating a marketing module and another for creating a module template. When creating a template, the template filter option is not needed.
```javascript
//Conditional for content type specific config
if (boolean) {
  getTemplates();
}

//ex
if (extensionField.field.schema.config.showTemplates) {
  getTemplates();
}
```