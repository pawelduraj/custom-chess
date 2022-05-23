module.exports = (rules) => {
    if (rules == null || !Array.isArray(rules)) return false;

    return rules.every(param => param.hasOwnProperty('id') && typeof param.id === 'string' && param.hasOwnProperty('value'));
}
