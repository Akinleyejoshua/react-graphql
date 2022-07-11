export const Filter = ({onClick}) => {
    return <div className="filter">
        <p>Filter :</p>
        <button onClick={event => onClick(event.target.innerHTML)}>Starlink-15 (v1.0)</button>
        <button onClick={event => onClick(event.target.innerHTML)}>Starlink-14 (v1.0)</button>
        <button onClick={event => onClick(event.target.innerHTML)}>Starlink-13 (v1.0)</button>
        <button onClick={event => onClick(event.target.innerHTML)}>Starlink-12 (v1.0)</button>
        {/* <button>Date</button>
        <button>Date</button>
        <button>Date</button>
        <button>Date</button> */}
    </div>
}