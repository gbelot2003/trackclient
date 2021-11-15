<template>
    <label :text="section.name"></label>
</template>

<script>
export default {
    name: 'Section',
    props: ['section'],
}
</script>