
/**
 * Module dependencies.
 */

var Notification = require('notification').Notification
  , inherit = require('inherit')
  , o = require('jquery');

/**
 * Expose `notify`.
 */

exports = module.exports = notify;

/**
 * Return a new `Notification` with the given 
 * (optional) `title` and `msg`. Either combination
 * may pass a callback.
 *
 * @param {String} title or msg
 * @param {Function} msg or callback
 * @param {Function} callback
 * @return {Dialog}
 * @api public
 */

function notify(title, msg){
  if ('string' == typeof msg) {
    return new ConfirmationNotification({ title: title, message: msg })
      .show(arguments[2]);
  } else {
    return new ConfirmationNotification({ message: title })
      .show(arguments[1]);
  }
}

/**
 * Initialize a new `ConfirmationNotification`.
 *
 * Options:
 *
 *    - `title` dialog title
 *    - `message` a message to display
 *
 * @param {Object} options
 * @api public
 */

function ConfirmationNotification(options) {
  options = options || {};
  var self = this;
  var msg = options.message;
  this.actions = o(require('./template'));
  options.message = this.actions;
  options.classname = 'confirmation-notification';
  Notification.call(this, options);
  this.actions.find('.cancel').click(this.oncancel.bind(this));
  this.actions.find('.ok').click(this.onok.bind(this));
  this.on('close', function(){ self.callback(false); });
  this.message(msg);
};

/**
 * Inherit from `Notification.prototype`.
 */

inherit(ConfirmationNotification, Notification);

/**
 * Handle cancel click.
 *
 * Emits "cancel".
 *
 * @param {Event} e
 * @api private
 */

ConfirmationNotification.prototype.oncancel = function(e){
  e.preventDefault();
  this.emit('cancel');
  this.callback(false);
  this.hide();
};

/**
 * Handle ok click.
 *
 * Emits "ok".
 *
 * @param {Event} e
 * @api private
 */

ConfirmationNotification.prototype.onok = function(e){
  e.preventDefault();
  this.emit('ok');
  this.callback(true);
  this.hide();
};

/**
 * Set confirmation `msg`.
 *
 * @param {String} msg
 * @return {ConfirmationNotification}
 * @api public
 */

ConfirmationNotification.prototype.message = function(msg){
  this.actions.find('.confirmation-notification-message').text(msg);
  return this;
};

/**
 * Focus `type`, either "ok" or "cancel".
 *
 * @param {String} type
 * @return {ConfirmationNotification}
 * @api public
 */

ConfirmationNotification.prototype.focus = function(type){
  this._focus = type;
  return this;
};

/**
 * Change "cancel" button `text`.
 *
 * @param {String} text
 * @return {ConfirmationNotification}
 * @api public
 */

ConfirmationNotification.prototype.cancel = function(text){
  this.actions.find('.cancel').text(text);
  return this;
};

/**
 * Change "ok" button `text`.
 *
 * @param {String} text
 * @return {ConfirmationNotification}
 * @api public
 */

ConfirmationNotification.prototype.ok = function(text){
  this.actions.find('.ok').text(text);
  return this;
};

/**
 * Show the notification and invoke `fn(ok)`.
 *
 * @param {Function} fn
 * @return {ConfirmationNotification}
 * @api public
 */

ConfirmationNotification.prototype.show = function(fn){
  Notification.prototype.show.call(this);
  if (this._focus) this.el.find('.' + this._focus).focus();
  this.callback = fn || function(){};
  return this;
};
