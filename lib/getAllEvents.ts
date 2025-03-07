export default async function getAllEvents() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', { next: {revalidate: 60} })
  
    if(!res.ok) {
      throw new Error(res.statusText)
    }
  
    return res.json()
  }