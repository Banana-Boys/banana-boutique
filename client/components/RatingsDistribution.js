/* eslint-disable react/jsx-key */
import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/ratingsdistribution.scss'

export const RatingsDistribution = props => {
  const {reviews} = props
  let ratingsDistribution = new Array(5).fill(0)
  reviews.forEach(review => {
    ratingsDistribution[review.rating - 1] =
      ratingsDistribution[review.rating - 1] + 1 / reviews.length * 100
  })
  const bananas = [1, 2, 3, 4, 5].map(rating =>
    new Array(rating).fill(
      <img
        className="bananarating"
        src="https://nanas-image-store.s3.us-east-2.amazonaws.com/nana-icon.jpg"
      />
    )
  )

  return (
    <div id="ratings-distribution">
      {ratingsDistribution.map((percent, i) => (
        <div key={i} className="rating-line">
          <span
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '80%'
            }}
          >
            <div>{bananas[i]}</div>
            <Link
              to={{search: `?rating=${i + 1}`}}
              className="rating-bar"
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '20px',
                width: '65%',
                border: '1px solid gray',
                borderRadius: '5px',
                overflow: 'hidden',
                margin: '3px 0'
              }}
            >
              <div
                className="rating-full"
                style={{
                  width: `${percent}%`,
                  height: '100%',
                  background: '#ffeecf'
                }}
              />
              <div
                className="rating-empty"
                style={{width: `${100 - percent}%`, height: '100%'}}
              />
            </Link>
          </span>
          <span>{percent.toFixed(0)}%</span>
        </div>
      ))}
    </div>
  )
}
