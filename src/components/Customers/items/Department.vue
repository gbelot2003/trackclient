<script>
export default {
    name: 'Department',
    template: `
        <Label :text="department.name" />
    `,
    props:['department']
}
</script>