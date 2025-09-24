import fs from 'fs'

export default {
    sum({ a, b }) {
        return a + b
    },
    createFile({ fileName, content }) {
        try {
            fs.writeFileSync(fileName, content)
            return true
        } catch (error) {
            return false
        }
    }
}