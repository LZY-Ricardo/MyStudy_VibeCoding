import { useComponentsStore } from '../../stores/components'
import React from 'react'
import { useComponentConfigStore } from '../../stores/component-config'
import type { Component } from '../../stores/components'

export default function Preview() {
    const { components } = useComponentsStore()
    const { componentConfig } = useComponentConfigStore()

    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component) => {
            const config = componentConfig?.[component.name]
            if (!config.prod) {
                return null
            }
            return React.createElement(
                config.prod,
                {
                    key: component.id,
                    id: component.id,
                    name: component.name,
                    styles: component.styles,
                    ...config.defaultProps,
                    ...component.props
                },
                renderComponents(component.children || [])
            )
        })
    }

    return (
        <div>
            {renderComponents(components)}
        </div>
    )
}
