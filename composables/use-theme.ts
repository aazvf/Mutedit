


// Whether the settings are open or not
export const useSettingsOpen = () => {
    return useState('settings-open', () => false);
}

// Return the things we want to persistently store and use in the theme plugin
export default () => {
    return useState('user-theme', () => {
        return {
            color: 'blue',
            accent: '',
            dark: false,
            align: 'left',
            container: true,
            columns: 0,
            transform: 'lowercase',
            hideAfterSeen: true,
            show: "sort,type,description,subs,words,status",
        };
    })
}

