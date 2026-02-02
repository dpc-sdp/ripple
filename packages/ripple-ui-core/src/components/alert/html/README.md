# RplAlert HTML Component

Web Component implementation of the Ripple Alert component for use with server-rendered HTML and Twig templates.

## Features

- ✅ **Progressive Enhancement**: Works without JavaScript
- ✅ **Web Component**: Custom element for encapsulated behavior
- ✅ **TypeScript**: Full type safety with compiled output
- ✅ **Zero Dependencies**: Native browser APIs only
- ✅ **Custom Events**: Emits `rpl-alert:dismiss` for tracking
- ✅ **Responsive**: Automatic height calculations with ResizeObserver

## Usage

### Basic HTML (No JavaScript)

```html
<rpl-alert 
  class="rpl-alert rpl-alert--information"
  data-alert-id="alert-1"
  data-message="Important information"
>
  <div class="rpl-alert__inner">
    <span class="rpl-alert__icon-info rpl-icon rpl-icon--size-m">
      <svg><use xlink:href="#icon-information-circle-filled"></use></svg>
    </span>
    <div class="rpl-alert__message-wrap">
      <div class="rpl-alert__message">Important information</div>
    </div>
  </div>
</rpl-alert>
```

### With JavaScript Enhancement

```javascript
import '@dpc-sdp/ripple-ui-core/components/alert/html'

// The custom element is auto-registered
// Listen for dismiss events
document.addEventListener('rpl-alert:dismiss', (e) => {
  console.log('Alert dismissed:', e.detail)
  // { id: 'alert-1', action: 'close', label: 'message text' }
})
```

### Programmatic Control

```javascript
const alert = document.querySelector('rpl-alert')

// Dismiss programmatically
alert.dismiss()

// Check if dismissed
if (alert.dismissed) {
  console.log('Alert is dismissed')
}
```

### Twig Template

```twig
{% include '@ripple/alert/RplAlert.twig' with {
  variant: 'information',
  message: 'Your alert message',
  alert_id: 'unique-id',
  is_dismissible: true,
  link_text: 'Learn more',
  link_url: '/more-info'
} %}
```

## API

### Attributes

- `data-alert-id` - Unique identifier for the alert
- `data-message` - Alert message text
- `data-dismissed` - Set to "true" to mark as dismissed

### Properties

- `dismissed` (readonly) - Boolean indicating if alert is dismissed

### Methods

- `dismiss()` - Programmatically dismiss the alert

### Events

- `rpl-alert:dismiss` - Fired when alert is dismissed
  ```typescript
  {
    detail: {
      id: string
      action: 'close'
      label: string
      text: string
    }
  }
  ```

## Browser Support

- Modern browsers with Web Components support
- Polyfill required for IE11 (if needed)

## CSS

The component uses the shared `RplAlert.css` file from the parent directory. All CSS classes match the Vue component implementation for consistency.
