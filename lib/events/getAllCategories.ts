export default async function getAllCategories() {
    const res = await fetch('http://localhost:3001/categories')
  
    if(!res.ok) throw new Error("Erreur lors du chargement des données");
    
    return await res.json()
  }