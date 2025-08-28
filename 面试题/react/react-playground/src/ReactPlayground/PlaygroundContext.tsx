import { createContext, useState, type PropsWithChildren } from 'react'
import { filenameLanguage } from './utils'
import { initFiles } from './files'

export interface File {
    name: string,
    language: string,
    value: string,
}

export interface Files {
    [key: string]: File,
}

export interface PlaygroundContext {
    files: Files,
    selectedFileName: string,
    setSelectedFileName: (fileName: string) => void,
    setFiles: (files: Files) => void,   
    addFile: (fileName: string) => void,
    removeFile: (fileName: string) => void,
    updateFileName: (fileName: string, newFileName: string) => void,
}

export const PlaygroundContext = createContext<PlaygroundContext>({
    selectedFileName: 'App.tsx',
} as PlaygroundContext)

// PlaygroundProvider 等同于仓库
export const PlaygroundProvider = (props: PropsWithChildren) => {
    const { children } = props
    const [files, setFiles] = useState<Files>(initFiles) // files 等同于仓库中的文件列表
    const [selectedFileName, setSelectedFileName] = useState<string>('App.tsx')
    const addFile = (name: string) => {
        setFiles(prev => ({
            ...prev,    
            [name]: {
                name,
                value: '',
                language: filenameLanguage(name),
            },
        }))
    }
    const removeFile = (name: string) => {
        delete files[name]
        setFiles(prev => ({
            ...prev,
        }))
    }
    const updateFileName = (oldFilename: string, newFileName: string) => {
        if (!files[oldFilename]) {
            return
        } 
        const {[oldFilename]: value, ...rest} = files
        const newFile = {
            [newFileName]: {
                ...value,
                name: newFileName,
                language: filenameLanguage(newFileName),
            }
        }
        setFiles({
            ...rest,
            ...newFile,
        })
    }

    return (
        <PlaygroundContext.Provider value={{
            files,
            setFiles,
            selectedFileName,
            setSelectedFileName,
            addFile,
            removeFile,
            updateFileName,
        }}>
            {children}
        </PlaygroundContext.Provider>
    )
}