<template>
  <div class="bg-white dark:bg-slate-800 lg:px-28">
    <Html lang="en" />
    <Meta property="og:image" content="/cover.jpg" />
    <Meta name="twitter:card" content="summary_large_image" />
    <AppLoadingBar />
    <AppNavbar class="sm:pt-6 sm:pb-10" />
    <slot />
  </div>
</template>
