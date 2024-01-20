# Stop Motion Widget

The "**Stop Motion Widget**" is an application that allows CMS users to dynamically create marketing guides without any engineering efforts.

## Usage
The application is designed to be delivered through a CMS. However, this functionality can be integrated directly into the platform, provided that the data driving the application is delivered dynamically and is accessible to business users.

### Rquirements
* Dependencies
  * Underscore JS
  * jQuery
  * jQuery UI

### Data Object
```javascript
var animationData =
  {
    'speed': 100,       //In Miliseconds            **If '0' there will be no animation**
    'minInterval': 0,   //In Seconds
    'maxInterval': 2.5, //In Seconds
    'preview': 30,      //% size of preview window  **If '0' there will be no preview**
    'intro': true,      //Slide Images
    'scrollbar': false, //Show Scroll Bar
    'bounce': false,    //Bounce Arrows
    'fade': false,      //Fade Elements Not Fully in View
    'imgWidth': 144,    //Img Width
    'imgHeight': 365,   //Height of Sprites
    'linkTo': false,    //[true] - Navigate to External Page | [false] - Drop Down to Section
    'sprites': [
      {
        'copy': 'Tom Girl',                                                       //Header Copy
        'catId': 'cat7240079',                                                    //For Linking to Category Below
        'imgSrc': '/Images/web/touts/2015/0205/jeans/w/14_146_3650_tom_girl.jpg', //Paths do not Have to Mirror Each Other
        'imgHeight': 3650                                                         //Full Height of Image **Must Be a Multiple of the Above imgHeight**
      }
    ]
  };
```

### Target DIV Element
```html
<div id="AnimationWidgetWrapper"></div>
```