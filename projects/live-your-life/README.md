# #LiveYourLife Cast Showcase
The "**Live Your Life Cast Showcase**" is an application that provides information about different cast members leveraging images, video, and social media connections.

<sup>This was a pair programming exercise with <a href="https://www.linkedin.com/in/scott-kehr-a166a659/" target="_blank">Scott Kehr</a>.</sup>

## Usage
The application is designed to be directly integrated within your platform. This application is driven by JSON so it could be opened to CMS users if needed.

### Requirements

#### Dependencies
* Underscore JS
* jQuery
* Backbone JS
* Modernizr JS
* Media Element Player
* Alice JS

### Data Object
```javascript
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
...
```