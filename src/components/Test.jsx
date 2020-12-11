import React, {useState, useEffect} from 'react'

export default function Test() {
  const [test, setTest] = useState('Hello')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => setTest(json))
  }, [])
  
  return (
    <div>
      <pre>
        {JSON.stringify(test, null, 2)}
      </pre>
    </div>
  )
}
