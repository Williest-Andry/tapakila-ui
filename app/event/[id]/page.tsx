import getEventById from "./fetchEvent";

export default async function Event({ params }) {
    const { id } = await params;
    const events = getEventById();

    return (
        <div>
            <section>
                <img alt="Event image"></img>
                <div>
                    <div>
                        <h1>Title</h1>
                        <p>Categories</p>
                        <h3>Place</h3>
                        <h3>Date</h3>
                        <h3>Organizer</h3>
                    </div>
                    <div>
                        COMPTEUR
                    </div>
                </div>
            </section>

            <section></section>
            
            <section></section>
        </div>
    )
}