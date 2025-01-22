
class Config {
    // 单例模式实现
    static #instance;

    constructor() {
        if (!Config.#instance) {
            // 直接暴露属性
            this.stream = true;
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