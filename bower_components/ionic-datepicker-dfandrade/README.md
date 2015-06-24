##Introduction:

To install `ionic-datepicker` from this fork, utilize **`bower install ionic-datepicker-dfandrade`**.

**ORIGINAL:** This is a `ionic-datepicker` bower component which can be used with any Ionic framework's application.

[View Demo](http://rajeshwarpatlolla.github.io/DatePickerForIonicFramework/demo/ "Demo") 


##Prerequisites.

1) node.js, bower and gulp.

##How to use:

1) In your project repository install the ionic date picker using bower

    bower install ionic-datepicker-dfandrade --save
    
2) Then you can see the following directory structure see in your project folder

![Directory structure](https://lh3.googleusercontent.com/8x3OByTXzzgJSxm-n5Yg8-0g-u2OZt18j9EbvNTgK3Q=w112-h207-p-no "Directory structure")

Give the path of  `style.css, templates.js and ionic-datepicker.js` in your `index.html` file.

````html
<link href="lib/ionic-datepicker-dfandrade/dist/style.css" rel="stylesheet"> 
<!-- path to ionic/angularjs js -->
<script src="lib/ionic-datepicker-dfandrade/dist/templates.js"></script>
<script src="lib/ionic-datepicker-dfandrade/dist/ionic-datepicker.js"></script>
````    
    
3) In your application module inject the dependency `ionic-datepicker`, in order to work with the ionic time picker
````javascript
angular.module('mainModuleName', ['ionic', 'ionic-datepicker']){
 //
}
````

4) DatePicker options

````
	date:            init date               ** Required
    min-date:        minimum date            (Default: null)
    max-date:        maximum date            (Default: null)
    popup-title:     Popup title             (Default: 'Select date')
    btn-close-text:  button close label      (Default: 'Close')
    btn-set-text:    button set label        (Default: 'Set')
    btn-today-text:  button today label      (Default: 'Today')
    btn-close-type:  button close design     (Default: 'button-default')
    btn-set-type:    button set design       (Default: 'button-positive')
    btn-today-type:  button today design     (Default: 'button-default')
    btn-today-show:  show/hide today button  (Default: true)
````

5) Then use the below format in your template / html file

````html
<ionic-datepicker date="myDate" min-date="minDate" max-date="maxDate" popup-title="{{'POPUP_TITLE' | translate}}" btn-close-text="{{'BTN_CLOSE' | translate}}" btn-set-text="{{'BTN_SET' | translate}}" btn-set-type="button-dark" btn-today-show="false">
	<button class="button button-outline icon-left ion-android-calendar button-balanced"> {{ myDate | date : 'mediumDate' }} </button>
</ionic-datepicker>
````

##Screen Shots:

Once you are successfully done with the above steps, you should be able to see the below screen shots.
I have used two buttons here. 

The first screen shot shows only the buttons before clicking on them.
Once you click on the button you should see the second screen shot.
 
![Date picker buttons](https://lh3.googleusercontent.com/YYlyw-ozro_rq9QB7hB1OzGKxo4kJpeGpXFo0ZgxF24=w117-h207-p-no "Date picker buttons") 
![Date picker modal](https://lh3.googleusercontent.com/GZPl7o0dx_Vp7lQB2IX35eM0u3wkK3bvSQw7mH3I5uY=w116-h207-p-no "Date picker modal")
##Versions:

### 1) v0.1.0
The whole date picker functionality has been implemented, and can be installed with  `bower install ionic-datepicker --save`

### 2) v0.1.1
Bug Fix. This is the latest version of `ionic-datepicker` component.

### 3) v0.1.2
Bug Fix. If we don't pass the date to the time picker it will pick the todays date by default.

### 4) v0.1.3
[Bug Fix](http://forum.ionicframework.com/t/ionic-datepicker-bower-component-for-ionic-framework-applications/21516/14)

### 5) v0.2.0
Disabling previous dates functionality added.

### 6) v1.0.0
* Attributes have been modified.
* Option for popup title and buttons label.
* Option for button design (color, type).
* Option show/hide today button.
* Option min/max date.

##License:
[MIT](https://github.com/rajeshwarpatlolla/ionic-datepicker/blob/master/LICENSE.MD "MIT")

##Contact:
gmail : rajeshwar.patlolla@gmail.com

github : https://github.com/rajeshwarpatlolla

twitter : https://twitter.com/rajeshwar_9032

facebook : https://www.facebook.com/rajeshwarpatlolla

paypal : rajeshwar.patlolla@gmail.com

gmail : diones.andrade@gmail.com



