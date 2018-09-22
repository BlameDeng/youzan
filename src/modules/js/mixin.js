let mixin = {
    filters: {
        currency(value) { return value.toFixed(2) },
        name(value) { return value.replace(value.charAt(1), ' * ') }
    }
};
export default mixin