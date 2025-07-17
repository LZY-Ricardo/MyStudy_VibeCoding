import { useMemo } from 'react'
import { useComponentConfigStore } from '../../stores/component-config'

export default function Material() {
  const { componentConfig } = useComponentConfigStore()
  const components = useMemo(() => {
    return Object.values(componentConfig) // [{xx}, {xx}, {xx}]
  }, [componentConfig])

  return (
    <div>
      {
        components.map(item => {
          return <div 
          key={item.name}
          className='
          border-dashed 
          border-[1px]
          border-[#000]
          py-[8px]
          px-[10px]
          inline-block
          bg-[#fff]
          m-[10px]
          cursor-pointer
          hover:bg-[#ccc]
          '
          >
            {item.name}
          </div>
        })
      }
    </div>
  )
}
