---
to: <%= h.changeCase.paramCase(name) %>/Rpl<%= h.changeCase.pascalCase(name) %>.css
---
@import '@dpc-sdp/ripple-ui-core/style/breakpoints';

.rpl-<%= h.changeCase.paramCase(name) %> {
  background-color: var(--rpl-clr-accent);
  color: var(--rpl-clr-primary);
  padding: var(--rpl-sp-2);
}
