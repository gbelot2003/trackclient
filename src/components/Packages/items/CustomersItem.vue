<template>
    <StackLayout class="item">
        <label class="h6 label" text="nombre de cliente"></label>
        <label class="label" text="080119562355"></label>
    </StackLayout>
</template>

<script>
export default {
    name: 'CustomersItem',
}
</script>

<style scoped>
    .item {
        margin-top:15;
        margin-left: 5;
        margin-right: 5;
        margin-bottom: 5;
        padding-left: 20;
        padding-bottom: 10;
        background-color: rgb(221, 214, 214);
    }

    .label {
        margin: 0;
    }
</style>