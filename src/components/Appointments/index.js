import {Component} from 'react'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    isFiltered: false,
    appointmentList: [],
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachOne => {
        if (id === eachOne.id) {
          return {...eachOne, isStarred: !eachOne.isStarred}
        }

        return eachOne
      }),
    }))
  }

  filterAppointments = () => {
    const {isFiltered} = this.state
    this.setState({isFiltered: !isFiltered})
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangDate = event => {
    this.setState({dateInput: event.target.value})
  }

  addAppointments = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: dateInput,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  getFilteredList = () => {
    const {isFiltered, appointmentList} = this.state
    if (isFiltered) {
      return appointmentList.filter(eachOne => eachOne.isStarred === true)
    }
    return appointmentList
  }

  render() {
    const {titleInput, dateInput} = this.state
    const filteredList = this.getFilteredList()
    return (
      <div className="bg-con">
        <div>
          <div>
            <form onSubmit={this.addAppointments}>
              <h1>Add Appointment</h1>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={titleInput}
                onChange={this.onChangeTitle}
                autoComplete="OFF"
              />
              <br />
              <label htmlFor="dates">Date</label>
              <input
                id="dates"
                type="date"
                onChange={this.onChangDate}
                value={dateInput}
              />

              <button type="submit" className="btn">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div>
            <h1>Appointments</h1>
            <button type="button" onClick={this.filterAppointments}>
              starred
            </button>
          </div>
          <ul>
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
