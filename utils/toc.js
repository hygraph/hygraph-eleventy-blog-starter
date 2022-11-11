


function getLevel(type) {
    // get number from either string heading-one, heading-two or string h1, h2, etc.
    // if string has dash, split and get last item and convert string one, two, etc. to number
    // if string has no dash, split on h and get number

    if (!type) return
    if (type.includes('-')) {
        const split = type.split('-')
        const level = split[split.length - 1]
        const number = level.replace('one', 1).replace('two', 2).replace('three', 3).replace('four', 4).replace('five', 5).replace('six', 6)
        return number
    } else {
        const split = type.split('h')
        const level = split[split.length - 1]

        return Number(level)
    }
}

function generateJSON (array) {
// INPUT: 
/* 
[
  {
    type: 'heading-one', // or h1
    id: 'd976443c-00e7-49fe-934e-009419c0c79a' // ID for jumplink
    // ...additionalData
  },
  {
    type: 'heading-two', // or h2
    id: 'd976443c-00e7-49fe-934e-009419c0c79a' // ID for jumplink
    // ...additionalData
  }
]


OUTPUT:
[
    {
        type: 'heading-one',
        id: '12c646c0-266f-4fb0-bb9a-977364c8dd60'
        // ...additionalData,
        tocChildren: [
            {
                type: 'heading-two',
                children: [ [Object] ],
                tocChildren: [],
            }
        ]
    }
]
*/

    let toc = []
    let currentLevel = 0
    let currentToc = toc
    let currentTocItem = null

    for (let i = 0; i < array.length; i++) {
        const item = array[i]
        const level = getLevel(item.type)

        if (toc.length === 0) {
            // first item
            currentLevel = level
        }
        // create array item at proper level
        if (level > currentLevel) {
            currentToc = currentToc[currentToc.length - 1].tocChildren
            currentTocItem = {
                ...item,
                tocChildren: [],
            }
            currentToc.push(currentTocItem)
        }
        if (level === currentLevel) {
            // add to currentToc
            currentTocItem = {
                ...item,
                tocChildren: [],
            }
            currentToc.push(currentTocItem)
        }
        if (level < currentLevel) {
            // add to parentToc
            currentTocItem = {
                ...item,
                tocChildren: [],
            }
            currentToc.push(currentTocItem)
        }
        currentLevel = level
    }
    return toc
}

module.exports = generateJSON