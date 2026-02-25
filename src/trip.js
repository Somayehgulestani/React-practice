import { useState } from 'react'

let data = [
  {
    category: 'Essentials',
    // items: ['Phone', 'USB', 'Power Bank', 'Camera'],
    items: [
      { id: 1, name: 'Phone', checked: false },
      { id: 2, name: 'USB', checked: false },
      { id: 3, name: 'Power Bank', checked: false },
      { id: 4, name: 'Camera', checked: false }
    ]
  },

  {
    category: 'Airplane',
    // items: ['Ticket', 'ID Card', 'Passpoert'],
    items: [
      { id: 5, name: 'Ticket', checked: false },
      { id: 6, name: 'ID Card', checked: false },
      { id: 7, name: 'Passport', checked: false }
    ]
  },
  {
    category: 'Bus',
    // items: ['Headphone', 'Neck Pillow', 'Bus Ticket'],
    items: [
      { id: 8, name: 'Headphone', checked: false },
      { id: 9, name: 'Neck Pillow', checked: false },
      { id: 10, name: 'Bus Tickest', checked: false }
    ]
  },
  {
    category: 'Miscellaneous',
    // items: ['Backpack / Daypack', 'Notebook & Pen', 'Book', 'Sunglasses'],
    items: [
      { id: 11, name: 'Backpack / Daypack', checked: false },
      { id: 12, name: 'Notebook & Pen', checked: false },
      { id: 13, name: 'Book', checked: false }
    ]
  },
  {
    category: 'Document',
    // items: ['Emergency Contacts', 'Credit Cards', 'Hotel Reserve'],
    items: [
      { id: 14, name: 'Emergency Contacts', checked: false },
      { id: 15, name: 'Credit Cards', checked: false },
      { id: 16, name: 'Hotel Reserve', checked: false }
    ]
  },
  {
    category: 'Toiletries',
    // items: ['Sunscreen', 'Towel', 'Shampoo', 'Toothbrush'],
    items: [
      { id: 17, name: 'Sunsreen', checked: false },
      { id: 18, name: 'Towel', checked: false },
      { id: 19, name: 'Shampoo', checked: false },
      { id: 20, name: 'Toothbrush', checked: false }
    ]
  },
  {
    category: 'Clothes',
    // items: ['T-shirt', 'Pants', 'Socks', 'Hat', 'Shoes'],
    items: [
      { id: 21, name: 'T-shirt', checked: false },
      { id: 22, name: 'Pants', checked: false },
      { id: 23, name: 'Socks', checked: false },
      { id: 24, name: 'Hat', checked: false },
      { id: 25, name: 'Shoes', checked: false }
    ]
  }
]

export function App () {
  const [list, setList] = useState(data)
  return (
    <div className='flex flex-col items-center  mt-12 border-2 border-purple-600 p-6  w-[75%] max-w-[450px] rounded-xl mx-auto'>
      <HeroSection list={list} />
      <Items list={list} onSetList={setList} />
    </div>
  )
}

function HeroSection ({ list }) {
  let total = list.reduce((val, e) => val + e.items.length, 0)
  
  
  let done = list.reduce((val,e)=> val+e.items.filter(item => item.checked).length,0)
  const percent = total > 0 ? Math.round((done / total * 100) ):0
  console.log(percent)

  return (
    <div className='relative '>
      <div className='w-full flex-col items-center'>
        <h1 className='text-[30px] text-center font-bold'>
          Travel to Florence
        </h1>
        <p className='font-[12px] text-neutral-700 text-center mb-4'>
          Sun, 12 march - thu,2 set,2026(9Nights)
        </p>
        <img
          className='w-full h-[110px]  rounded-xl object-cover '
          src='/img/florence.jpg'
          alt='folrence'
        ></img>
        <div className='flex items-center translate-x-[-50%] left-1/2  absolute -bottom-4 px-4 shadow-md w-[90%]  gap-3 bg-white p-2 rounded-lg '>
          <span className='text-[12px] text-gray-600'>{total} items</span>
          <div className='w-full h-2 bg-gray-300 rounded-full '>
            <div className='w-{} flex-1 h-full bg-purple-600 rounded-full'></div>
          </div>
          <span className='text-sm text-gray-600'>0%</span>
        </div>
      </div>
    </div>
  )
}

function Items ({ list, onSetList }) {
  const [open, setOpen] = useState(null)

  const [input, setInput] = useState('')

  function handleValue (e, index) {
    e.preventDefault()
    const newList = list.map((v, i) => {
      if (index === i) {
        return {
          ...v,
          items: [...v.items, { name: input, checked: false }]
        }
      }
      return v
    })
    onSetList(newList)
    setInput('')
  }

  function handleCheckBox (e, index) {
    const check = list.map(item => {
      const check2 = item.items.map((value, i) => {
        if (index === i) {
          return {
            ...value,
            checked: !value.checked
          }
        }

        return value
      })
      return { ...item, items: check2 }
    })
    onSetList(check)
    console.log(check)
  }

  function handleSort (e, index) {
    const newList = [...list]
    const sortList = newList[index].items.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    newList[index] = { ...newList[index], items: sortList }
    onSetList(newList)
  }
  return (
    <div className='mt-8 w-full'>
      {list.map((item, index) => {
        return (
          <div key={index} className='shadow-lg p-4 rounded-lg w-full'>
            <h2 className='font-bold flex justify-between mb-4 pr-2'>
              {item.category}
              <div>
                <span
                  className='cursor-pointer self-end '
                  onClick={e => handleSort(e, index)}
                >
                  🔃
                </span>
                <span
                  onClick={() => setOpen(index === open ? null : index)}
                  className='cursor-pointer text-lg '
                >
                  {open === index ? '➖' : '➕'}
                </span>
              </div>
            </h2>
            {open === index && (
              <div className='flex flex-col gap-2'>
                {item.items.map((option, index) => {
                  return (
                    <div
                      key={index}
                      className='flex justify-between p-1 border border-neutral-300 rounded-lg pr-2 pl-2'
                    >
                      {option.name}
                      <input
                        type='checkbox'
                        className=''
                        onChange={e => handleCheckBox(e, index)}
                      ></input>
                    </div>
                  )
                })}
                <form
                  className='relative'
                  onSubmit={e => handleValue(e, index)}
                >
                  <input
                    value={input}
                    placeholder='Add items'
                    onChange={e => setInput(e.target.value)}
                    className='border border-gray-400 w-full p-1 mt-2'
                  ></input>
                  <button className='text-3xl absolute right-1 bottom-1 text-neutral-700 '>
                    +
                  </button>
                </form>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
