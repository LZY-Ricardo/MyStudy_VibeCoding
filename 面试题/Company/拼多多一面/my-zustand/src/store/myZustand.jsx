import { useEffect, useState } from "react"

/**
 * 创建状态存储
 * @param {Function} createState - 创建状态的函数
 * @returns {Object} - 存储对象
 */
const createStore = (createState) => {
    let state
    let listeners = new Set() // 存储所有监听器
    
    /**
     * 设置状态 - 支持函数式更新和对象合并
     * @param {Object|Function} partial - 部分状态或更新函数
     */
    const setState = (partial) => {
        const nextState = typeof partial === 'function' ? partial(state) : partial
        
        if (!Object.is(nextState, state)) {
            const previousState = state
            // 合并状态
            state = Object.assign({}, state, nextState)
            
            // 通知所有监听器状态已更新
            listeners.forEach(listener => {
                try {
                    listener(state, previousState)
                } catch (error) {
                    console.error('状态监听器执行出错:', error)
                }
            })
        }
    }
    
    /**
     * 获取当前状态
     * @returns {Object} - 当前状态
     */
    const getState = () => {
        return state
    }
    
    /**
     * 订阅状态变化
     * @param {Function} listener - 监听器函数
     * @returns {Function} - 取消订阅的函数
     */
    const subscribe = (listener) => {
        if (typeof listener !== 'function') {
            console.warn('监听器必须是一个函数')
            return () => {}
        }
        
        listeners.add(listener)
        
        // 返回取消订阅函数
        return () => {
            listeners.delete(listener)
        }
    }
    
    /**
     * 获取初始状态
     * @returns {Object} - 初始状态
     */
    const getInitialState = () => {
        return state
    }
    
    const store = { setState, getState, subscribe, getInitialState }
    
    // 初始化状态
    state = createState(setState, getState, store)
    
    return store
}

/**
 * 使用存储的 Hook - 支持选择器
 * @param {Object} api - 存储 API
 * @param {Function} selector - 状态选择器函数（可选）
 * @returns {any} - 选中的状态或完整状态
 */
const useStore = (api, selector) => {
    const [, forceRender] = useState(0)
    
    // 获取当前选中的状态
    const getSelectedState = () => {
        const state = api.getState()
        return selector ? selector(state) : state
    }
    
    // 初始化当前状态
    const [currentState, setCurrentState] = useState(getSelectedState)
    
    useEffect(() => {
        // 订阅状态变化
        const unsubscribe = api.subscribe((newState, prevState) => {
            if (selector) {
                const newSelectedState = selector(newState)
                const oldSelectedState = selector(prevState)
                
                // 只有选中的状态发生变化时才重新渲染
                if (!Object.is(newSelectedState, oldSelectedState)) {
                    setCurrentState(newSelectedState)
                    forceRender(Math.random())
                }
            } else {
                // 没有选择器时，直接使用完整状态
                setCurrentState(newState)
                forceRender(Math.random())
            }
        })
        
        // 组件卸载时取消订阅，防止内存泄漏
        return unsubscribe
    }, [api, selector])
    
    return currentState
}

/**
 * 创建 Zustand 存储
 * @param {Function} createState - 创建状态的函数
 * @returns {Function} - 绑定的存储 Hook
 */
const create = (createState) => {
    const api = createStore(createState)
    
    /**
     * 绑定的存储 Hook
     * @param {Function} selector - 状态选择器（可选）
     * @returns {any} - 选中的状态
     */
    const useBoundStore = (selector) => useStore(api, selector)
    
    // 将存储 API 方法绑定到 Hook 上
    Object.assign(useBoundStore, api)
    
    return useBoundStore
}

export default create