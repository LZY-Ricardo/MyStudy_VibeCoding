import { create } from 'zustand'

const useComponentsStore = create((set) => ({
    // 数据
    mode: 'edit',
    // 方法
    setMode: (type: string) => {
        return (set(() => ({mode: type})))
    },
}))

export default useComponentsStore