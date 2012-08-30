
# ConfirmationNotification

  Confirmation notification component with a clean slate to build off of.

  ![js confirmation notification](http://f.cl.ly/items/2P2H0s3U2m0p1L0C3m1c/Screen%20Shot%202012-08-30%20at%2011.44.16%20AM.png)

  These don't _have_ to look like growl style notifications, use
  your trusty friend CSS.

## Installation

```
$ component install component/confirmation-notification
```

## Features

  - all the features of [notification](http://github.com/component/notification)

## Events

  - `close` the notification is closed via the X
  - `click` the notification is clicked
  - `cancel` the user closed the notification or cancelled
  - `ok` the user accepted

## Example

```js
var notify = require('confirmation-notification');

notify('Accept friend request?', function(yes){
  alert(yes ? 'wahoo' : 'nope');
})
```

## API

### notify(msg, [fn])

  Notify with the given `msg` and no title. If a
  function is given it will be invoked with a boolean
  representing the user's choice.

### notify(title, msg, [fn])

  Notify with the given `msg` and `title`. If a
  function is given it will be invoked with a boolean
  representing the user's choice.

### ConfirmationNotification#focus(type)

  By default the "cancel" button is focused, however you
  may invoke `.focus('ok')`.

### ConfirmationNotification#cancel(text)

  Set cancel button `text`.

### ConfirmationNotification#ok(text)

  Set cancel ok `text`.

### ConfirmationNotification#show([fn])

  Show the notification and invoke `fn` with
  a boolean representing the user's choice.

  When `fn` is omitted you may still utilize the `cancel` / `ok` events.

## License

  MIT
