
class Config {
    // 单例模式实现
    static #instance;

    constructor() {
        if (!Config.#instance) {
            this.stream = true;
            this._ip = 'http://localhost:5001'
            Config.#instance = this;
        }
        return Config.#instance;
    }

    set(newConfig) {
        Object.assign(this, newConfig);
        return this;
    }
}

let config = new Config();

module.exports = {config}