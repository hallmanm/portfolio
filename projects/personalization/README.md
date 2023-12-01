# Building a Dynamic JavaScript Recommendation Widget

In the fast-paced world of e-commerce, recommendations play a crucial role in enhancing user experience and driving sales. One effective way to implement personalized recommendations on your website is by using a dynamic JavaScript widget. Here, we'll explore the structure and functionality of a JavaScript application that powers a recommendation widget.

## Introduction

This application is an efficient way to integrate recommendation widgets into your website. It supports various configurations and layouts to suit different needs.

Let's break down the key features and components of this JavaScript application:

### 1. **Modular Structure**

The code is well-organized with modular functions, making it easy to understand and extend. The entire application is encapsulated within an immediately invoked function expression (IIFE), ensuring a private scope for its variables and functions.

### 2. **Configuration and Data Collection**

The `collectData` function extracts configuration parameters from HTML elements to customize the widget's behavior. These parameters include layout, placement, view, and more. The function returns an object (`data`) containing these configuration values.

### 3. **Widget Building**

The `buildWidget` function is responsible for constructing the recommendation widget based on the provided data. It adds relevant classes to the widget's HTML elements and adjusts the layout and appearance accordingly.

### 4. **Widget Formatting**

The `formatWidget` function modifies the widget's appearance based on its type. For instance, if the widget type is "lead," it adds a prominent lead button to the first section of the widget.

### 5. **Widget Placement**

The `placeWidget` function determines where the widget should be placed on the page. It considers the specified location (`data.loc`) and placement method (`data.placement`). For example, the widget can be appended to an element or inserted before or after an element.

### 6. **Image Handling**

The `updateImagePreset` function updates the image source based on a provided string, ensuring a consistent format for images within the widget.

### 7. **Handling Partial Grids**

In the case of a partial grid, the `showPartialGrid` function adjusts the display, showing more sections if needed.

### 8. **Promotions Section**

For the "promotions" type, the application fetches promotion data from an external source and dynamically builds sections with relevant information.

### 9. **Ratings Integration**

For the "rated" type, the application fetches product ratings from an external API and displays the average rating and total reviews for each product.

### 10. **Bundle Features**

The application includes features for bundling products, including a lead section and the ability to add all items to the shopping bag.

### 11. **Carousel Handling**

The `handleCarousel` function manages the carousel behavior, including arrow visibility and scrolling functionality.

## Example Data

```
var init = function(){
	awo.at.widgets.xts = {
	  "globalSettings":{ // New
	    "url":"{{your endpoint here}}"
	  },
	  "MoreLooksToLove": {
	    "settings": {
	      "params": { // New
	        "prodId":"${mbox.entity.id}",
	        "catId":"${mbox.entity.categoryId}"
	      },
	      "elemid": "awo_ml2l",
	      "tag": "mltl_pdp",
	      "loc": "#awo_more_looks_to_love",
	      "placement": "insertBefore",
	      "layout": "carousel",
	      "limit":"16", // New
	      "partial":"",
	      "view": 4,
	      "constrained": "true",
	      "arrows": "out",
	      "border": "",
	      "header": "center",
	      "title":"More Looks To Love",
	      "copy": "", 
	      "gender": "",
	      "type": "more-looks-to-love",
	      "preset": "_of"
	    }
	  }
	}
};
```

## Conclusion

This JavaScript application serves as a versatile and powerful tool for incorporating recommendation widgets into your website. Its flexibility allows customization based on various factors, providing a seamless and engaging experience for users. As you integrate this application, consider further optimizations and enhancements to align it with your specific use cases and design principles.