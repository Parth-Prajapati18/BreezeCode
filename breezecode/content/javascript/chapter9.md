
#### Chapter 9: Asynchronous JavaScript

```markdown
---
title: "Asynchronous JavaScript"
---

# Asynchronous JavaScript

Asynchronous programming allows JavaScript to perform tasks without blocking the main thread.

## Callbacks

A callback is a function passed as an argument to another function.

### Example Code

```javascript
function fetchData(callback) {
  setTimeout(function() {
    callback("Data loaded");
  }, 1000);
}

fetchData(function(data) {
  console.log(data);
});
