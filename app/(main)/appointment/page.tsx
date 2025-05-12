"use client"

import React from 'react'
import { scheduleAppointment } from '../actions'

type Props = {}

const AppointmentSimplePage = (props: Props) => {
  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-neutral-100">Appointments Form</h2>
      <form
        action={scheduleAppointment}
        className='flex flex-col space-y-6 bg-neutral-900 p-6 rounded-xl border border-neutral-800'
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300" htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name='email'
            required
            className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300" htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name='name'
            required
            className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        {/* Removed duplicate email field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300" htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            name='date'
            required
            className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300" htmlFor="phone_number">Phone Number:</label>
          <input
            id="phone_number"
            type="tel"
            name='phone_number'
            className="w-full p-2 rounded-md bg-neutral-800 border border-neutral-700 text-neutral-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          type='submit'
          className='w-full py-3 px-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200'
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default AppointmentSimplePage 
