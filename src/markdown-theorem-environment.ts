export type EnvironmentData = {
    text: string,
    counter: number | string,
    [_: string]: any
}

const defaultStyle = `
.theorem {
    margin: 1em 0;
}

.theorem-info:not(.empty)::before {
    content: "(";
}

.theorem-info:not(.empty)::after {
    content: ") ";
}

.theorem-info + p {
    display: inline-block;
    margin: 0;
}
`

const defaultData = {
    axiom: {
        text: '公理',
        counter: 1
    },
    definition: {
        text: '定义',
        counter: 2
    },
    theorem: {
        text: '定理',
        counter: 3
    },
    proposition: {
        text: '命题',
        counter: 'theorem'
    },
    lemma: {
        text: '引理',
        counter: 'theorem'
    },
    corollary: {
        text: '推论',
        counter: 'theorem'
    },
    property: {
        text: '性质',
        counter: 'theorem'
    },
    problem: {
        text: '问题',
        counter: 3
    },
    example: {
        text: '例',
        counter: 3
    },
    exercise: {
        text: '练习',
        counter: 3
    },
    note: {
        text: '笔记',
        counter: 0
    },
    conclusion: {
        text: '结论',
        counter: 0
    },
    assumption: {
        text: '假设',
        counter: 0
    },
    remark: {
        text: '注',
        counter: 0
    },
    solution: {
        text: '解',
        counter: 0
    },
    proof: {
        text: '证明',
        counter: 0
    }
}

const defaultGenerator = (env: Environment) => {
    const counterTable = [
        '',
        'counter(h2counter) "." ',
        'counter(h2counter) "." counter(h3counter) "."',
        'counter(h2counter) "." counter(h3counter) "." counter(h4counter) "." ',
        'counter(h2counter) "." counter(h3counter) "." counter(h4counter) "." counter(h5counter) "." ',
        'counter(h2counter) "." counter(h3counter) "." counter(h4counter) "." counter(h5counter) "." counter(h6counter) "."'
    ]

    env.style.innerHTML = defaultStyle
    for (const name in env.data) {
        const data = env.get(name)
        const { id, level } = env.getCounter(name)

        env.style.innerHTML += `
.theorem[env-name="${name}"]::before {
    content: "${data.text}" ${level === 0 ? '' : `" " ${counterTable[level - 1]} counter(${id})`} ". ";
    font-weight: bold;
    counter-increment: ${id};
}
`
    }
}

export default class Environment {
    style: HTMLStyleElement
    data: Record<string, EnvironmentData>
    generator: (env: Environment) => void

    /**
     * 构造一个 Environment
     * @param style 样式元素
     */
    constructor(style: HTMLStyleElement) {
        this.style = style
        this.data = defaultData
        this.generator = defaultGenerator
    }

    /**
     * 应用当前环境
     */
    apply() {
        this.generator(this)
    }

    /**
     * 获取指定环境
     * @param name 环境名
     * @returns 环境，若不存在则返回 `undefined`
     */
    get(name: string) {
        return this.data[name]
    }

    /**
     * 查询是否存在指定环境
     * @param name 环境名
     * @returns 存在返回 `true` ，不存在则返回 `false`
     */
    contains(name: string) {
        return this.get(name) !== undefined
    }

    /**
     * 获取指定环境的计数器信息
     * @param name 环境名
     * @returns 计数器信息
     */
    getCounter(name: string) {
        const counter = this.get(name).counter
        return typeof counter === 'number' ? {
            id: name.replaceAll('@', '-'),
            level: counter
        } : {
            id: counter.replaceAll('@', '-'),
            level: this.get(counter).counter as number
        }
    }
}