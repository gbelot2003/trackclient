<template>
  <StackLayout>
    <GridLayout columns="*, auto" height="100">
      <StackLayout class="item" column="0">
        <Label class="title" :text="item.name" />
        <Label :text="item.description" textWrap="true" />
      </StackLayout>
      <StackLayout column="1" >
        <Button text="cancel" height="90" @tap="cancel" />
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  name: "TransitoItem",
  props: ["item"],
  methods:{
    cancel(){
      this.$emit('choice')
    }
  }
};
</script>