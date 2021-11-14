<template>
  <StackLayout>
    <Label>{{ item.code }}</Label>
    <Label>{{ item.sender }}</Label>
    <Label>{{ item.reciver }}</Label>
    <Label>{{ item.type }}</Label>
    <Label>{{ item.description }}</Label>
    <Label>{{ item.transaction }}</Label>
    <Label>{{ item.updated_at }}</Label>
  </StackLayout>
</template>

<script>
export default {
  name: "Package",
  props: ["item"],
};
</script>