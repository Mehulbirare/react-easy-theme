export const getThemeScript = (
    storageKey: string = 'theme-preference',
    attribute: string = 'class',
    defaultTheme: string = 'system',
    value: { light: string; dark: string } = { light: 'light', dark: 'dark' },
) => {
    return `(function() {
    try {
      var storageKey = '${storageKey}';
      var attribute = '${attribute}';
      var defaultTheme = '${defaultTheme}';
      var darkVal = '${value.dark}';
      var lightVal = '${value.light}';

      var theme = localStorage.getItem(storageKey);
      var support = window.matchMedia('(prefers-color-scheme: dark)').matches === true;

      if (!theme && defaultTheme === 'system') {
        theme = support ? 'dark' : 'light';
      } else if (!theme) {
        theme = defaultTheme;
      }

      if (theme === 'dark') {
        document.documentElement.classList.add(darkVal);
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove(darkVal);
        document.documentElement.style.colorScheme = 'light';
      }
    } catch (e) {}
  })();`;
};
