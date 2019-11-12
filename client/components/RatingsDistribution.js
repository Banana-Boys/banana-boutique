/* eslint-disable react/jsx-key */
import React from 'react'

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
    <div style={{width: '80%', maxWidth: '250px'}}>
      {ratingsDistribution.map((percent, i) => (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <span
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '80%'
            }}
          >
            <div>{bananas[i]}</div>
            <div
              className="rating-bar"
              style={{
                display: 'flex',
                height: '20px',
                width: '65%',
                flexDirection: 'row',
                border: '1px solid black',
                borderRadius: '5px',
                overflow: 'hidden',
                margin: '3px 0'
                //   justifySelf: 'center'
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
                className="level-empty"
                style={{width: `${100 - percent}%`, height: '100%'}}
              />
            </div>
          </span>
          <span>{percent.toFixed(0)}%</span>
        </div>
      ))}
    </div>
  )
}
