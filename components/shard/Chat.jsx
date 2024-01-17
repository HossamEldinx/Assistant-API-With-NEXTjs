import React from 'react'

export default function Chat(props) {
  let { messages } = props
  return (
    <div className="chat">
      {messages && messages.messages?.data.length > 0 && messages.messages.data.map((el, i) => {
        return <div key={el.id} className='chat-role'>

          {el.role === 'user' ? <div className='avatar'>U</div> : <div className='avatar' style={{ backgroundColor: '#4e9122' }}>A</div>}

          <p className='text-content' >{el.content[0].text.value}</p>

        </div>
      })}

    </div>
  )
}


