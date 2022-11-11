


function getLevel(type) {
    // get number from either string heading-one, heading-two or string h1, h2, etc.
    // if string has dash, split and get last item and convert string one, two, etc. to number
    // if string has no dash, split on h and get number

    if (!type) return
    if (type.includes('-')) {
        // console.log('in dash', type)
        const split = type.split('-')
        const level = split[split.length - 1]
        // convert one, two, etc. to number
        const number = level.replace('one', 1).replace('two', 2).replace('three', 3).replace('four', 4).replace('five', 5).replace('six', 6)
        return number
    } else {
        // console.log('in no dash', type)

        const split = type.split('h')
        const level = split[split.length - 1]

        return Number(level)
    }
}

function generateJSON (array) {

/* 
[
  {
    type: 'heading-one',
    children: [ [Object] ],
    id: 'd976443c-00e7-49fe-934e-009419c0c79a'
  }
]
[
  {
    type: 'heading-one',
    children: [ [Object] ],
    id: 'f23057eb-8c54-446b-8eab-320f6158312b'
  },
  {
    type: 'heading-two',
    children: [ [Object] ],
    id: 'ed36b28b-f00b-4805-b958-6129b8c01dd2'
  },
  {
    type: 'heading-three',
    children: [ [Object] ],
    id: '45f48d91-9d50-45a7-ac41-3589f1285059'
  }
]
INPUT: 

OUTPUT:
[
    {
        type: 'heading-one',
        children: [ [Object] ],
        tocChildren: [
            {
                type: 'heading-two',
                children: [ [Object] ],
                tocChildren: []
            },
            {
                type: 'heading-two',
                children: [ [Object] ],
                tocChildren: []
            }


        ]
        id: '12c646c0-266f-4fb0-bb9a-977364c8dd60'

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

            console.log('deeper level condition')
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

    console.log(toc)
    return toc

}

module.exports = generateJSON