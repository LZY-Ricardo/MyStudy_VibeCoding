import { loadCorpus } from './lib/corpus.js'
import { createRandomPick } from './lib/random.js'
import { generator } from './lib/generator.js'


// fs.readFile('./corpus/data.json',{encoding:'utf-8'}, (err, data) => {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data);     
//     }
// }

const corpus = loadCorpus('./corpus/data.json')




const title = createRandomPick(corpus.title)()
const article = generator(title, {corpus, min: 2000, max: 3000})

console.log(title);
console.log(article);



