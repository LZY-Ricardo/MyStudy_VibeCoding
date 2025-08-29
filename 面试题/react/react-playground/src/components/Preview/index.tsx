import { useContext, useEffect, useState } from 'react'
import { compile } from './compiler'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import Editor from '../CodeEditor/Editor'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '../../ReactPlayground/files'


export default function Perview() {
  const { files } = useContext(PlaygroundContext)
  // const code = compile(files) as string // main.tsx
  const [code, setCode] = useState('')

  const getIframeUrl = () => {
    const res = iframeRaw.replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
    ).replace(
      '<script type="module"></script>',
      `<script type="module">${code}</script>`
    )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  const [iframeUrl, setIframeUrl] = useState(getIframeUrl())

  useEffect(() => {
    setCode(compile(files) as string)
  }, [files])

  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [code])

  return (
    <div style={{ height: '100%' }}>
      <iframe
        src = {iframeUrl}
        style={{ width: '100%', height: '100%', border: 'null'}}
      />

      {/* <Editor file={{
        name: 'preview',
        language: 'javascript',
        value: code
      }} /> */}
    </div>
  )
}