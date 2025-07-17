import React, { useEffect } from 'react'
import { useComponentsStore } from '../../stores/components'
import type { Component } from '../../stores/components'
import { useComponentConfigStore } from '../../stores/component-config'

export default function EditArea() {
  const { components, addComponent } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  // useEffect(() => {
  //   addComponent({
  //     id: 2,
  //     name: 'Container',
  //     props: {},
  //     desc: '页面容器'
  //   }, 1)

  //   addComponent({
  //     id: 3,
  //     name: 'Button',
  //     props: {
  //       text: '提交'
  //     },
  //     desc: '按钮',
  //     children: []
  //   }, 2)

  // }, [])

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]
      if (!config?.component) { // 没有对应的组件
        console.log(666);
        
        return null
      }
      console.log(666);
      
      // 渲染组件
      return React.createElement(
        config.component,
        {
          key: component.id,
          ...config.defaultProps,
          ...component.props
        },
        renderComponents(component.children || [])  // 递归渲染整个 json 树
      )
    })
  }

  return (
    <div>
      {renderComponents(components)}
      {/* <pre>
        {
          JSON.stringify(components, null, 2)
        }
      </pre> */}
    </div>
  )
}