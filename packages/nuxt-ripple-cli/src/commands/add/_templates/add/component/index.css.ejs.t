---
to: <%= h.changeCase.paramCase(name) %>/<%= h.prefixedPascalCase(prefix, name) %>.css
---
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.<%= h.prefixedParamCase(prefix, name) %> {
  background-color: var(--rpl-clr-accent);
  color: var(--rpl-clr-primary);
  padding: var(--rpl-sp-2);
}
