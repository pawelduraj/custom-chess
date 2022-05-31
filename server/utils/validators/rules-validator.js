module.exports = (rules) => {
    if (rules == null || !Array.isArray(rules)) return false;

    if (rules.some(param => !param.hasOwnProperty('id') || typeof param.id !== 'string' || !param.hasOwnProperty('value'))) return false

    let rule;

    rule = rules.find(r => r.id === 'capture-all');
    if (rule == null || ![true, false].includes(rule.value)) return false;

    rule = rules.find(r => r.id === 'castling');
    if (rule == null || ![true, false].includes(rule.value)) return false;

    rule = rules.find(r => r.id === 'multimove');
    return !(rule == null || !Array.isArray(rule.value) || !rule.value.every(v => v === 1 || v === 2) || rule.value.length > 4);
}
