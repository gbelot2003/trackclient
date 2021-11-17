<script>
export default {
    name: 'Municipality',
    template: `
        <Label :text="municipality.name" />
    `,
    props:['municipality']
}
</script>