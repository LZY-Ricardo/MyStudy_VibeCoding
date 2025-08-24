import { createRoot } from 'react-dom/client'
import { createPortal } from 'react-dom'
import React from 'react'

const root = createRoot(document.getElementById('root'))

function Model() {
  // const portalObject = createPortal(<div id='foo'>foo</div>, document.getElementById('root2'))
  // console.log(portalObject);
  // return portalObject

  const fragment = (
    <React.Fragment>
      <div id='foo'>foo</div>
    </React.Fragment>
  )
  console.log(fragment);
  return fragment
}

root.render(<Model />)
