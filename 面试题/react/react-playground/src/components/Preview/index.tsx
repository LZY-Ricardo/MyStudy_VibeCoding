import { compile } from './compiler'
import { useContext } from 'react'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import  Editor  from '../CodeEditor/Editor/index'

export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  const code = compile(files) as string
  
  
  return (
    <div style={{height: '100%'}}>
      <Editor
        file={{
          name: 'Preview',
          value: code,
          language: 'javascript',
        }}
      />
    </div>
  )
}
