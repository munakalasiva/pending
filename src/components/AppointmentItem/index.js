// Write your code here
import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleStar} = props
  const {id, title, date, isStarred} = eachAppointment

  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(id)
  }

  return (
    <li className="list-item">
      <div>
        <p>{title}</p>
        <button onClick={onClickStar} type="button" data-testid="star">
          <img src={starImage} alt="star" />
        </button>
      </div>
      <p>Date: {formattedDate}</p>
    </li>
  )
}
export default AppointmentItem
