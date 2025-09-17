import { create } from 'zustand'

function logMiddleware(func) {
    return function (set, get, store) {
        function newSet(...args) {
            console.log('调用了set, 旧的 state:', get());
            return set(...args)
        }
        return func(newSet, get, store)
    }
}

const useListStore = create((set, get, store) => ({
    data: ['html', 'css', 'js', 'react'],
    addData: (item) => {
        console.log(store);
        
        set((state) => { // set 能驱使 用到了 data 的那个组件重新渲染
            return {
                data: [...state.data, item]
            }
        })
    }
}))

const useTestStore = create(logMiddleware((newSet) => ({
    count: 0,
    updateCount: (value) => {
        newSet(() => ({
            count: value
        }))
    }
})))

export { useListStore, useTestStore }
