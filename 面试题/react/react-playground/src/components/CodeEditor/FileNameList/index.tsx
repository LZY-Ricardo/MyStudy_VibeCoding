import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '../../../ReactPlayground/PlaygroundContext'
import FileNameItem from './FileNameItem'
import styles from './index.module.scss'  

export default function FileNameList() {
  const {
    files,
    setFiles,
    selectedFileName,
    setSelectedFileName,
    addFile,
    removeFile,
    updateFileName,
  } = useContext(PlaygroundContext)
  
  const [tabs, setTabs] = useState<string []>([])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <FileNameItem
          key={index}
          value={tab}
          actived={tab === selectedFileName}
          onClick={() => setSelectedFileName(tab)}
        />
      ))}
    </div>
  )
}
