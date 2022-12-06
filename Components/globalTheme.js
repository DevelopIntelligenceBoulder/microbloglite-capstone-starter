let instance; 

let globalTheme = {
    light: true
}

class stateUtility {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    getTheme(theme) {
        return globalTheme[theme];
    }
    setTheme(selectedTheme , theme) {
        globalTheme[selectedTheme] = theme;
    }
}

const instanceFreeze = object.freeze(new stateUtility());

export default instanceFreeze;