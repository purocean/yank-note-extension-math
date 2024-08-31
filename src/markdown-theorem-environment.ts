export type EnvironmentData = {
    text: string,
    counter: number | string,
    [_: string]: any
}

const defaultStyle = `
`

export default class Environment {
    style: HTMLStyleElement
    template: string
    env: Record<string, EnvironmentData>

    /**
     * 构造一个 Environment
     * @param style 样式元素
     */
    constructor(style: HTMLStyleElement) {
        this.style = style
        this.template = ''
        this.env = {}
    }

    /**
     * 添加一个环境
     * @param name 环境名
     * @param data 环境属性
     * @returns 返回是否添加成功
     */
    add(name: string, data: EnvironmentData) {
        data.text ??= ''
        data.counter ??= 0
        if (typeof data.counter === 'string' && this.env[data.counter] === undefined
            || typeof data.counter === 'number' && (!Number.isInteger(data.counter) || data.counter < 0 || data.counter > 6)) {
            return false
        }
        this.env[name] = data
        return true
    }

    /**
     * 从CSS字符串加载环境
     * @param css CSS字符串
     * @returns 返回是否没遇到错误
     */
    load(css: string) {
        let left, right = 0
        const data = {}
        while (true) {
            left = css.indexOf('/*@@', right)
            if (left === -1) {
                break
            }
            left += 4
            right = css.indexOf('*/', left)

            const match = css.slice(left, right).match(/^\s*(\w+)/)
            if (match === null) {
                continue
            }
            left += match[0].length

            switch (match[1]) {
                case 'template':
                    this.template += css.slice(left, right)
                    break
                case 'data':
                    try {
                        Object.assign(data, JSON.parse(css.slice(left, right)))
                    } catch { }
                    break
            }

            right += 2
        }
        let flag = true
        for (const name in data) {
            flag &&= this.add(name, data[name])
        }
        return flag
    }

    /**
     * 应用当前环境
     */
    apply() {
        this.style.innerHTML = defaultStyle
    }
}