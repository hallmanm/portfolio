# REGEX Word Counter
The "**REGEX Word Counter**" is an application that provides guardrails for word limits within an input field.

## Usage
The application is designed to be directly integrated within your platform.

#### Target DIV Element
```html
<textarea tabindex="2" id="essayDesc" name="essayDesc" rows="7" cols="35" placeholder="Please enter your words here..." onkeyup="liveCount()" onblur="liveCount()" style="width:90%"></textarea>
```
```html
<div id="wordCountOutput"></div>
```