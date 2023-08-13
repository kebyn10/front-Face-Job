import React from 'react'
import icon from '../../assets/img/bear.jpg'

export const PostCard = () => {
  return (
    <section className="post-contain">
        <div data-aos="fade-up" data-aos-duration="500" className="post">
            <div className="post-info">
                <div className="post-icon">
                    <img src={icon} alt="icon"/>
                </div>
                <div>
                <h2>user name</h2>
                <p>user profesion</p>
                </div>
            </div>
            <div className="post-img">
                <p>esta caja puede contener texti y imagenes</p>
            </div>
            <div className="post-content">
                <input type="text" placeholder='Post commnet'/>
                <h2>User name</h2>
                <p>Description</p>
            </div>
            <div className="post-stats">
                <div className="post-like">❤</div>
                <div className="post-comment">📝</div>
                <div className="post-share">💬</div>
            </div>
        </div>
    </section>
  )
}
