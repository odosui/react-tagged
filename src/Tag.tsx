import * as React from 'react'
import { memo, useState, useEffect, useRef } from 'react'

const Tag: React.FC<{ name: string; onDelete: () => void }> = memo(
  ({ name, onDelete }) => {
    const [classes, setClasses] = useState('react-tagged--tag-enter')
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
      setClasses('react-tagged--tag-enter react-tagged--tag-enter-active')
    }, [])

    const elRef = useRef<HTMLDivElement>(null)

    const handleDelete: React.MouseEventHandler = (e) => {
      e.preventDefault()
      setClasses('react-tagged--tag-leave')
      setTimeout(() => {
        setClasses('react-tagged--tag-leave react-tagged--tag-leave-active')
        setDeleting(true)
      }, 10)
    }

    const handleTransitionEnd: React.TransitionEventHandler = ({ target }) => {
      if (target === elRef.current && deleting) {
        setDeleting(false)
        onDelete()
      }
    }

    return (
      <div
        className={`react-tagged--tag ${classes}`}
        onTransitionEnd={handleTransitionEnd}
        ref={elRef}
      >
        {name}
        <button onClick={handleDelete} aria-label="Delete">
          ×
        </button>
      </div>
    )
  },
)

export default Tag
