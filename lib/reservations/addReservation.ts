export default async function addReservation() {
    const res = await fetch(`http://localhost:3001/reservations/${reservationId}`, { method: "DELETE", headers: { "Authorization": localStorage.getItem("authToken") || "" } });
  
    if (!res.ok) throw new Error("Erreur lors du chargement des données");
    
    return await res.json()
  }