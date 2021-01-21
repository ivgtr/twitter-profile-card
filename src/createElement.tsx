import * as React from 'react'

import type { FullUser } from 'twitter-d' // eslint-disable-line node/no-unpublished-import

export default function createElement(tweetData: FullUser, selectColor: colors) {
  const profileIcon = tweetData.profile_image_url_https
  const profileBanner = tweetData.profile_banner_url
  const color: { [key: string]: string } = {
    default: '#fff',
    yellow: '#ffad1f',
    pink: '#e0245e',
    purple: '#794bc4',
    orange: '#f45d22',
    green: '#17bf63'
  }

  const wrapper = {
    position: 'relative' as 'relative',
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    backgroundColor: '#fff',
    overflow: 'hidden'
  }

  const absolute = {
    position: 'absolute' as 'absolute'
  }

  const header = {
    height: '33%',
    width: '100%',
    overflow: 'hidden'
  }

  const headerImage = {
    height: '100%',
    width: '100%',
    objectFit: 'cover' as 'cover'
  }

  const icon = {
    left: '25px',
    top: 'calc(33% - 65px)',
    height: '130px',
    width: '130px',
    borderRadius: '50%',
    backgroundColor: `${color[selectColor] || '#fff'}`
  }

  const iconWrapper = {
    left: '5px',
    top: '5px',
    height: '120px',
    width: '120px',
    borderRadius: '50%',
    overflow: 'hidden'
  }

  const iconImage = {
    height: '100%',
    width: '100%',
    objectFit: 'cover' as 'cover'
  }

  const profile = {
    left: '30px',
    top: '42%',
    width: 'calc(100% - 60px)'
  }
  const profileName = {
    color: '#111',
    fontSsize: '2.1rem'
  }
  const profileId = {
    marginTop: '-1rem',
    fontSize: '1.3rem',
    color: '#555'
  }
  const profileDescription = {
    marginTop: '-0.5rem',
    fontSize: '1.3rem'
  }

  const bottom = {
    left: '30px',
    bottom: '10px'
  }

  const bottomData = {
    fontSize: '1.3rem',
    margin: '0'
  }

  return (
    <div style={wrapper}>
      <div style={{ ...absolute, ...header }}>
        <img
          src={profileBanner}
          alt="header image"
          height="100px"
          width="300px"
          style={headerImage}
        />
      </div>
      <div style={{ ...absolute, ...icon }}>
        <div style={{ ...absolute, ...iconWrapper }}>
          <img src={profileIcon} alt="icon image" height="120px" width="120px" style={iconImage} />
        </div>
      </div>
      <div style={{ ...absolute, ...profile }}>
        <h1 style={profileName}>{tweetData.name}</h1>
        <h2 style={profileId}>@{tweetData.screen_name}</h2>
        <p style={profileDescription}>{tweetData.description}</p>
      </div>
      <div style={{ ...absolute, ...bottom }}>
        {tweetData.location && <p style={bottomData}>{`location: ${tweetData.location}`}</p>}
        <p
          style={bottomData}
        >{`follows: ${tweetData.friends_count} / followers: ${tweetData.followers_count}`}</p>
      </div>
    </div>
  )
}
