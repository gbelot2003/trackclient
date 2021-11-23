<template>
    <label :text="settlement.name"></label>
</template>

<script>
export default {
    name: 'Settlement',
    props: ['settlement'],
}
</script>