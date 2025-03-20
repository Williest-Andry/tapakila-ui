export default async function getSearchedEvent(query: string = "") {
    const res = await fetch(`http://localhost:3001/events?title=${query}`, { next: {revalidate: 60} })
  
    if(!res.ok) throw new Error("Erreur lors du chargement des données");
    
    return await res.json()
  }