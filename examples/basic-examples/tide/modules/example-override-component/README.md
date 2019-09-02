# Ripple with custom landing page component example

This is a example for overriding the Ripple components in Tide landing page which
is dynamically loaded.

We can extend the original Ripple components(Or write a new one depends on your requirement),
then replace the component in component loader.

In this module, we are replacing the `rpl-card-promotion` with a custom template.

## Which component can be overridden in this way

In any page which is `landing page` content type, all components within
`.app-content` container can be overridden except `rpl-anchor-links` and `app-topic-tags`.
