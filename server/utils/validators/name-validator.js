module.exports = (name) => {
    if (name == null) return false;

    if (typeof name !== 'string') return false;

    if (name.length !== name.trim().length) return false;

    return name.length > 3 && name.length < 17;
}
