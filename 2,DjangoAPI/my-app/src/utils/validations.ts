export interface FormFieldRule {
    rule: string,
    value?: any
    message: string
}

export const validate = (value: string, rules: FormFieldRule[] | undefined): string | undefined => {
    if (rules) {
        for (let i = 0; i < rules.length; i++) {
            const rule = rules[i];
            let error: boolean = false;
            switch (rule.rule) {
                case 'required':
                    error = !value;
                    break;
                case 'regexp':
                    error = !new RegExp(rule.value).test(value);
                    break;
                case 'min':
                    error = rule.value && value && value.length < rule.value;
                    break;
                case 'max':
                    error = rule.value && value && value.length > rule.value;
                    break;
                case 'equals':
                    error = rule.value && value && value !== rule.value;
                    break;
                default:
                    break;
            }
            if(error){return rule.message}
        }
    }
    return undefined;
}