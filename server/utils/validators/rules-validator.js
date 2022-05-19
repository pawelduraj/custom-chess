module.exports = (rules) => {
    if (rules == null || !Array.isArray(rules)) return false;

    return rules.every(param => param.hasOwnProperty('id') && param.hasOwnProperty('value'));
}
