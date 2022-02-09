<template>
  <div>
    <RplButton label="tests" :theme="'primary'" />
    <RplAccordion
      title="test"
      :panels="[{ title: 'test', content: 'asdasdasd', isOpen: true, id: 1 }]"
    ></RplAccordion>
    <NuxtWelcome />
  </div>
</template>
