import React from 'react'
import './Pagination.css'

export default function Pagination() {
  return (
    <div className="pagination">
            <div className="pagination-container">
                <ul>
                    <li className='active'><a href='#'>1</a></li>
                    <li><a href='#'>2</a></li>
                    <li><a href='#'>3</a></li>
                    <li><a href='#'>4</a></li>
                    <li><a href='#'>...</a></li>
                </ul>
            </div>
        </div>
  )
}
