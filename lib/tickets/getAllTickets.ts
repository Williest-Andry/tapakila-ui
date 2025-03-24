export default async function getAllTickets() {
    const res = await fetch('http://localhost:3001/tickets')
  
    if(!res.ok) throw new Error("Erreur lors du chargement des données");
    
    return await res.json()
  }