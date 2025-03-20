export default async function getAllLocations() {
    const res = await fetch('http://localhost:3001/locations')
  
    if(!res.ok) throw new Error("Erreur lors du chargement des données");
    
    return await res.json()
  }