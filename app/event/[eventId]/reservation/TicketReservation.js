'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import './TicketReservation.css';

const TicketReservation = () => {
  const [seats, setSeats] = useState(1);
  const [name, setName] = useState('');
  const [reservationDate, setReservationDate] = useState('');
  const [cancellationDate, setCancellationDate] = useState('');
  const [reservations, setReservations] = useState([]);
  const [reservationType, setReservationType] = useState('simple');
  const [errorFields, setErrorFields] = useState({});
  const [cancellations, setCancellations] = useState(0);

  const totalSeats = 100;

  const handleReservation = () => {
    const errors = {};
    if (!name) errors.name = true;
    if (!seats || seats < 1) errors.seats = true;
    if (!reservationDate) errors.reservationDate = true;
    if (!cancellationDate) errors.cancellationDate = true;

    if (Object.keys(errors).length > 0) {
      setErrorFields(errors);
      alert("Veuillez remplir tous les champs requis.");
      return;
    }

    const newReservation = {
      name,
      seats,
      type: reservationType,
      reservationDate: new Date().toLocaleDateString(),
      desiredDate: reservationDate,
      cancellationDate: cancellationDate,
    };
    setReservations([...reservations, newReservation]);
    alert(`Réservation pour ${name} avec ${seats} siège(s) confirmée!`);

    setName('');
    setSeats(1);
    setReservationDate('');
    setCancellationDate('');
    setErrorFields({});
  };

  const handleCancelReservation = (index) => {
    const canceledReservation = reservations[index];
    const updatedReservations = reservations.filter((_, i) => i !== index);
    setReservations(updatedReservations);
    setCancellations(cancellations + 1);
    alert(`Réservation de ${canceledReservation.name} annulée. Date d'annulation: ${new Date().toLocaleDateString()}`);
  };

  const reservedTickets = reservations.length;
  const availableTickets = totalSeats - reservations.reduce((acc, res) => acc + res.seats, 0);

  return (
    <div className="centered-container">
      <motion.h1
        className="centered-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Réservation de Ticket
      </motion.h1>

      <motion.div
        className="content-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="content-element">
          <input
            type="text"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={errorFields.name ? 'input-error' : ''}
          />
        </div>
        <div className="content-element">
          <input
            type="number"
            min="1"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className={errorFields.seats ? 'input-error' : ''}
          />
        </div>
        <div className="content-element">
          <select value={reservationType} onChange={(e) => setReservationType(e.target.value)}>
            <option value="place1">place1</option>
            <option value="place2">place2</option>
            <option value="place3">place3</option>
            <option value="place4">place4</option>
          </select>
        </div>
        <div className="content-element">
          <input
            type="date"
            placeholder="Date souhaitée"
            value={reservationDate}
            onChange={(e) => setReservationDate(e.target.value)}
            className={errorFields.reservationDate ? 'input-error' : ''}
          />
        </div>
        <div className="content-element">
          <input
            type="date"
            placeholder="Date d'annulation"
            value={cancellationDate}
            onChange={(e) => setCancellationDate(e.target.value)}
            className={errorFields.cancellationDate ? 'input-error' : ''}
          />
        </div>
        <div className="content-element">
          <button onClick={handleReservation}>Réserver</button>
        </div>
      </motion.div>

      <motion.h2
        className="centered-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Réservations
      </motion.h2>

      <motion.ul
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        {reservations.map((reservation, index) => (
          <li key={index} className="reservation-item">
            <p>{reservation.name} - {reservation.seats} siège(s) - {reservation.type}</p>
            <p>Réservé le: {reservation.reservationDate}</p>
            <p>Date souhaitée: {reservation.desiredDate}</p>
            <button onClick={() => handleCancelReservation(index)}>Annuler</button>
          </li>
        ))}
      </motion.ul>

      <motion.h2
        className="centered-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Statistiques de Réservation
      </motion.h2>

      <div className="statistics-table">
        <p>Tickets réservés: {reservedTickets}</p>
        <p>Tickets annulés: {cancellations}</p>
        <p>Tickets disponibles: {availableTickets}</p>
      </div>
    </div>
  );
};

export default TicketReservation;
