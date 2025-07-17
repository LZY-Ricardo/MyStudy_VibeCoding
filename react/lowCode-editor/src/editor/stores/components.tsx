import { Children } from 'react';
import { create } from 'zustand'

export interface Component {
    id: number,
    name: string,
    props: any,
    desc: string,
    children?: Component[]
    parentId?: number
}

export interface State {
    components: Component[]
}

export interface Action {
    addComponent: (component: Component, parentId?: number) => void;
    deleteComponent: (id: number) => void;
    updateComponentProps: (componentId: number, props: any) => void;
}


export const useComponentsStore = create<State & Action>(
    (set, get) => ({
        // 数据
        components: [
            {
                id: 1,
                name: 'Page',
                props: {},
                desc: '页面',
                children: []
            },
        ],
        // 方法
        addComponent: (component, parentId) => { // 本质上就是要将一个对象添加到另一个对象中
            set((state) => {
                if (parentId) {
                    // 获取到父级对象
                    const parentComponent = getCompontentById(parentId, state.components)
                    if (parentComponent) {
                        parentComponent.children ? parentComponent.children.push(component) : parentComponent.children = [component]
                    }
                    component.parentId = parentId
                    return {
                        components: [...state.components]
                    }
                } else {
                    return {
                        components: [...state.components, component]
                    }
                }
            })
        },
        deleteComponent: (componentId) => { // 在整个 json 对象中找到某一个子对象的 id 为 componmentId 的对象并删除
            if (!componentId) return
            // 找到组件
            const component = getCompontentById(componentId, get().components)
            if (component?.parentId) { // 有父级
                // 找到父级组件
                const parentComponent = getCompontentById(component.parentId, get().components)
                if (parentComponent) { // 有父级组件
                    // 从父级组件中删除
                    parentComponent.children = parentComponent.children?.filter((item) => item.id !== componentId)
                }
                set({
                    components: [...get().components]
                })
            } else { // 无父级
                set({
                    components: get().components.filter((item) => item.id !== componentId)
                })
            }
        },
        updateComponentProps: (componentId, props) => {
            set((state) => {
                const component = getCompontentById(componentId, state.components)
                if (component) {
                    component.props = {...component.props, ...props}
                    return {
                        components: [...state.components]
                    }
                }
                return { components: [...state.components] }
            })
        }
    })
)

export function getCompontentById(id: number | null, components: Component[]): Component | null {
    if (!id) return null
    for (const component of components) {
        if (component.id === id) return component
        if (component.children && component.children.length > 0) {
            const result = getCompontentById(id, component.children)
            if (result) return result
        }
    }
    return null
}