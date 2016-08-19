Google Images styled responsive gallery. This plugin has been created in pure Javascript. 

    The breakpoints are set at 768px and 992px for responsiveness.

**Customisation**:
*colsXs*: number of columns in devices with width < 768px  (default 1)
*colsSm*: number of columns in devices with width < 992px  (default 2)
*cols*: number of columns in devices with width >= 992px   (default 3)
*elemId*: Id of the element containing the gallery (default port-content)

**Implementation:**
Add the following code at the end of the page above the closing </body> tag - 
```
document.addEventListener('DOMContentLoaded', function() {
    var gallery= new portPlugin();
});
```
To customise, add an object with required properties -
```
document.addEventListener('DOMContentLoaded', function() {
    var gallery= new portPlugin({
        cols: 3,
        elemId:"port-content"
    });
});
```

Tested for Safari, Chrome and Firefox.