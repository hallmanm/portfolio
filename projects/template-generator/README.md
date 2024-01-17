# Master Module

The "Master Module" is an application that allows CMS users to dynamically create marketing modules without any engineering efforts.

## Usage
The application is meant to be an "extension" within a headless CMS. The contents from master_module.html can be directly included into the CMS extension. Typically, the CMS will import the extension as an iframe.

## Integrations with CMS

### Connect with CMS
```javascript
//ex
ContentstackUIExtension.init().then(function (extension) {

}
```

### Build UI
```javascript
//init accepts data from the CMS form to pre-populate saved content entries.
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