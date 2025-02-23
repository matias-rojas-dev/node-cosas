const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf-8');

// const words = content.split(' ').filter(word => word.toLowerCase.includes('react')).length
// const words = content.split(' ')

const reactWordCount = content.match(/react/gi).length

console.log(reactWordCount)