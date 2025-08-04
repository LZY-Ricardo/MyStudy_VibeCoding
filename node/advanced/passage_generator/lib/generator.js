import { randomInt } from "./random.js"
import { createRandomPick } from "./random.js"

function sentence(pick, replacer) {
    let ret = pick()
    for (const key in replacer) { // key: said, title...
        ret = ret.replace(new RegExp(`{{${key}}}`, 'g'), replacer[key])
    }
    return ret
}

export function generator(title, {corpus, min=1000, max=2000}) {
    const articleLength = randomInt(min, max)
    const {bosh, bosh_before, famous, said, conclude} = corpus
    const [boshPick, boshBeforePick, famousPick, saidPick, concludePick] = [bosh, bosh_before, famous, said, conclude].map(createRandomPick)

    const article = []
    let totalLength = 0
    while (totalLength < articleLength) {
        let section = ''
        const sectionLength = randomInt(200, 500)
        // 生成段落
        while (section.length < sectionLength) {
            const n = randomInt(0, 100)
            if (n < 20) {
                section += sentence(famousPick, {said: saidPick(), conclude: concludePick()})
            } else if (n < 50) {
                section += sentence(boshBeforePick, {title}) + sentence(boshBeforePick, {title})
            } else {
                section += sentence(boshPick, {title}) + sentence(boshPick, {title})
            }
        }
        article.push(section)
        totalLength += section.length
    }
    return article.join('\n')
}