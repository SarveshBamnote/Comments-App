import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    commentsList: [],
    name: '',
    comment: '',
  }

  toggleLikeBtn = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filterList = commentsList.filter(eachComment => eachComment.id !== id)

    this.setState({commentsList: filterList})
  }

  onAddComment = event => {
    event.preventDefault()

    const {name, comment} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      date: new Date(),
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  render() {
    const {commentsList, name, comment} = this.state

    return (
      <div className="main-container">
        <div className="comments-container">
          <h1 className="heading">Comments</h1>
          <div className="comment-image-container">
            <form className="comments-form" onSubmit={this.onAddComment}>
              <p className="desc">Say something about 4.0 Technologies</p>
              <input
                type="text"
                className="name-input"
                onChange={this.onChangeName}
                value={name}
                placeholder="Your Name"
              />
              <textarea
                className="comment-input"
                onChange={this.onChangeComment}
                value={comment}
                rows="6"
                placeholder="Your Comment"
              />
              <button className="add-comment-btn" type="submit">
                Add Comment
              </button>
            </form>

            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="hr-line" />
          <p className="count-head">
            <span className="comments-count">{commentsList.length}</span>{' '}
            comments
          </p>
          <ul className="comments-container">
            {commentsList.map(eachComment => (
              <CommentItem
                commentDetails={eachComment}
                toggleLikeBtn={this.toggleLikeBtn}
                deleteComment={this.deleteComment}
                key={eachComment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
