# Exploring the Live Your Life JavaScript Application

This was a pair programming exercise with <a href="https://www.linkedin.com/in/scott-kehr-a166a659/" target="_blank">Scott Kehr</a>.

## Overview of the Live Your Life Application

The Live Your Life application appears to be a multimedia-driven experience, utilizing Backbone.js as its primary framework. It combines various media types, including images, videos, and interactive elements, to create an engaging user interface. Let's break down some key aspects of the application:

### 1. Backbone.js Structure

Backbone.js is a lightweight JavaScript framework that provides structure to web applications by offering models, views, collections, and routers. In the Live Your Life application, we can identify the following Backbone.js components:

- **Models:** `BlockModel` and `RowModel` are Backbone models representing individual blocks and rows, respectively.

- **Collections:** `BlockCollection` represents a collection of blocks, and `collectionOfRows` is a collection of rows.

- **Views:** `BlockView` and `RowView` are Backbone views responsible for rendering individual blocks and rows.

### 2. Multimedia Integration

The application incorporates images, videos, and scalable elements to create a visually appealing interface. It dynamically loads content based on the media type specified in the model. YouTube videos are embedded using iframes, and images are loaded with various configurations.

### 3. Widget Functionality

The application includes a widget that allows users to interact with the content. Users can open and close the widget, and it provides navigation options, social sharing buttons, and a back-to-top button.

### 4. User Interaction

User interaction is facilitated through various events, such as scrolling, mouse clicks, and keyboard inputs. The application responds to arrow key presses for horizontal and vertical scrolling, providing a seamless user experience.

### 5. Responsive Design

The application appears to be designed with responsiveness in mind. It adjusts its layout based on the window width, ensuring compatibility with different devices and screen sizes.

## Example Data

```
{
		"modelName": "Shay",
		"bitly": "http://on.ae.com/Pm6GDL",
		"fbTwitter": "and follow @shaymitch ",
		"fbName": "actress Shay",
		"twitterCopy" : "Actress Shay (@shaymitch)",
		"startPosition": "left",
		"row": [
			{
				"blockWidth": 25
			},
			{
				"blockWidth": 75,
				"mediaType": "scalable",
				"bundleId": "bundleCatId=cat5930102&productId=0393_9260_600"
			},
			{
				"blockWidth": 100
			},
			{
				"blockWidth": 25,
				"mediaType": "scalable",
				"bundleId": "bundleCatId=cat5900248",
				"social": true
			},
			{
				"blockWidth": 75,
				"mediaType": "vid",
				"youTubeID": "8KcZDolqBLw"
			},
			{
				"blockWidth": 50,
				"mediaType": "bio",
				"link1": "/web/guides/w_jeanguide.jsp?catId=cat5900036&icid=AE:LiveYourLife:ShayBio:FindYourFit",
				"link1Text": "Find Your Fit",
				"link2": "/web/sweepstakes/index.jsp?icid=AE:LiveYourLife:ShayBio:EnterContest",
				"link2Text": "Enter Contest"
			}
		]
	}
```

## Conclusion

The Live Your Life JavaScript application showcases the capabilities of Backbone.js in structuring web applications. Its multimedia features and interactive elements contribute to a dynamic and engaging user experience. Understanding the application's structure and functionality provides insights into the complexities involved in creating modern, feature-rich web applications.