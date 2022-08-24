<template>
  <aside
    class="
      hidden
      pb-8
      overflow-x-hidden overflow-y-auto
      lg:top-header
      lg:sticky
      lg:-mt-8
      lg:block
      lg:self-start
      lg:pb-0
      lg:pt-8
    "
  >
    <slot name="above"></slot>
    <nav>
      <ContentNavigation v-slot="{ navigation }">
        <SidebarNavigation :links="navigation" />
      </ContentNavigation>
    </nav>
    <slot name="below"></slot>
  </aside>
</template>