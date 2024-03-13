import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {commentDetails, toggleLikeBtn, deleteComment} = props
  const {id, name, comment, isLiked, initialClassName, date} = commentDetails

  const onClickLikeBtn = () => {
    toggleLikeBtn(id)
  }

  const onClickDeleteBtn = () => {
    deleteComment(id)
  }

  const likeClassName = isLiked ? 'button active' : 'button'

  const initial = name ? name[0].toUpperCase() : ''

  const likeIconUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const time = formatDistanceToNow(date)

  return (
    <li className="comment-list">
      <div className="comment-container">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="name-time-container">
            <p className="name">{name}</p>
            <p className="time">{time} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>

      <div className="like-delete-btn">
        <div className="like-container">
          <img className="like-icon" src={likeIconUrl} alt="like" />
          <button
            className={likeClassName}
            onClick={onClickLikeBtn}
            type="button"
          >
            Like
          </button>
        </div>

        <button
          className="button"
          onClick={onClickDeleteBtn}
          type="button"
          data-testid="delete"
        >
          <img
            className="delete-icon"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
