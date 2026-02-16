export interface FieldConfig {
    name: string;
    label: string;
    type: 'text' | 'email' | 'tel' | 'number' | 'date';
    required: boolean;
    placeholder?: string;
    description?: string;
}

export const USER_FIELDS: FieldConfig[] = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        required: true,
        placeholder: 'Enter name'
    },
    {
        name: 'username',
        label: 'Username',
        type: 'text',
        required: true,
        placeholder: 'Enter username'
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'Enter email address'
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: 'Enter phone number'
    },
    {
        name: 'website',
        label: 'Website',
        type: 'text',
        required: false,
        placeholder: 'Enter website'
    }
];
