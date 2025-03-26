export default async function UpdatePastEvents() {
    try {
        const response = await fetch("http://localhost:3001/events/update");
        const data = await response.json();
    } catch (error) {
        console.error("Erreur de chargement", error);
    }
}
