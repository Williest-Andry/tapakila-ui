export default async function addReservation(idUser: string, idTicket: number, quantity: number) {
    const res = await fetch(`http://localhost:3001/reservations`, 
      { method: "POST", 
          headers: { "Authorization": localStorage.getItem("authToken") || "", 'Content-Type': 'application/json' },
          body: JSON.stringify({ idUser, idTicket, quantity })
      }
    );
  
    if (!res.ok) throw new Error("Erreur lors du chargement des données");
    
    return await res.json()
  }