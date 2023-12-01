# Stop Motion Widget

In the fast-paced world of web development, capturing user attention is crucial. The right blend of animation and interactivity can make a significant difference in engaging your audience.

## Dive into the Stop Motion Widget

The Stop Motion Widget is a versatile tool designed to display a collection of animated sprites in a visually appealing and interactive manner. Whether you're showcasing products, highlighting features, or just aiming to add a touch of dynamism to your webpage, this widget has got you covered.

## Features at a Glance

### Easy Integration

Integrating the Stop Motion Widget into your webpage is a breeze. Simply include the required files (`sprite_gallery.css` and `jquery-drag.js`) and place the widget within a designated `<div>` element.

```html
<div id="AnimationWidgetWrapper"></div>
```

### Customizable Animation Data

Tailor the Stop Motion to your specific needs by providing the necessary data. The `animationData` object allows you to define parameters such as animation speed, intervals, preview size, and more. Here's a quick example:

```javascript
var animationData = {
  'speed': 100,
  'minInterval': 0,
  'maxInterval': 2.5,
  'preview': 30,
  'intro': true,
  'scrollbar': false,
  'bounce': false,
  'fade': false,
  'imgWidth': 144,
  'imgHeight': 365,
  'linkTo': false,
  'sprites': [
    {
      'copy': 'Tom Girl',
      'catId': 'cat7240079',
      'imgSrc': '/Images/web/touts/2015/0205/jeans/w/14_146_3650_tom_girl.jpg',
      'imgHeight': 3650
    }
    // Add more sprite entries as needed
  ]
};
```

### Dynamic Rendering

The widget dynamically renders the provided data, creating an immersive showcase of animated sprites. Whether you want a smooth transition, an introductory animation, or other effects, the Stop Motion Widget has the flexibility to adapt.

### Preview Window

Enhance user experience with a preview window, allowing users to navigate through the animation easily. The preview window provides a glimpse of upcoming sprites, adding an extra layer of interactivity.

### External Links or Section Dropdowns

Choose between linking each sprite to an external page or creating a smooth dropdown effect to a specific section on your webpage. The flexibility is in your hands.

## Implementation Made Easy

The Stop Motion Widget comes with a straightforward implementation process. The `buildWidget` function takes care of rendering the widget based on the provided data. If needed, you can also override default settings by passing custom data to the function.

```javascript
// Example of overriding default data
var customData = {
  'speed': 200,
  'scrollbar': true,
  // Add more custom parameters as needed
};

buildWidget(customData);
```

## Conclusion

Incorporating animations into your web projects has never been this seamless. The Stop Motion Widget empowers you to captivate your audience with visually stunning sprite animations. Enhance your website's user experience and bring your content to life with this dynamic and customizable widget. Integrate it today and watch your web pages come alive!