// An IE11 polyfill for crypto.
// Required by modules:
// - @nuxtjs/auth-next
// - nanoid
if (!window.crypto) {
  window.crypto = window.msCrypto
}
