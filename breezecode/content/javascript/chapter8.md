
#### Chapter 8: Events

```markdown
---
title: "Events"
---

# Events

JavaScript allows you to respond to user interactions and other events that occur in the browser.

## Event Listeners

Event listeners can be added to elements to listen for specific events.

### Example Code

```javascript
let button = document.getElementById("myButton");

button.addEventListener("click", function() {
  alert("Button was clicked!");
});
