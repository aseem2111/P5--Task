
import { useState } from 'react'
import './post.css'

function Post() {
  const [postType, setPostType] = useState('question')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [abstract, setAbstract] = useState('')
  const [articleText, setArticleText] = useState('')
  const [tags, setTags] = useState('')

  function handlePost() {
    if (!title.trim() || !tags.trim()) {
      alert('Please enter a title and tags.')
      return
    }

    if (postType === 'question' && !description.trim()) {
      alert('Please describe your problem.')
      return
    }

    if (postType === 'article' && (!abstract.trim() || !articleText.trim())) {
      alert('Please enter the abstract and article text.')
      return
    }

    const tagList = tags.split(',').map(tag => tag.trim()).filter(Boolean)

    if (tagList.length > 3) {
      alert('Please enter no more than 3 tags.')
      return
    }

    alert('Your post has been submitted successfully!')
  }

  return (
    <div className="post-container">
      <div className="post-card">
        <h2>New Post</h2>

        <div className="post-type">
          <label>
            <input
              type="radio"
              checked={postType === 'question'}
              onChange={() => setPostType('question')}
            />
            Question
          </label>

          <label>
            <input
              type="radio"
              checked={postType === 'article'}
              onChange={() => setPostType('article')}
            />
            Article
          </label>
        </div>

        <h3>What do you want to ask or share?</h3>

        <label>Title</label>
        <input
          type="text"
          placeholder="Enter a title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        {postType === 'question' ? (
          <>
            <label>Describe your problem</label>
            <textarea
              placeholder="Describe your problem"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </>
        ) : (
          <>
            <label>Abstract</label>
            <textarea
              placeholder="Enter an abstract"
              value={abstract}
              onChange={e => setAbstract(e.target.value)}
            />

            <label>Article Text</label>
            <textarea
              placeholder="Enter your article"
              value={articleText}
              onChange={e => setArticleText(e.target.value)}
            />
          </>
        )}

        <label>Tags (separate with commas)</label>
        <input
          type="text"
          placeholder="React, Learning, Help"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />

        <button type="button" onClick={handlePost}>
         post
        </button>
      </div>
    </div>
  )
}

export default Post
