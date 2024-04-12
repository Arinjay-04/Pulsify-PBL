import './Donar.css'

const Donar = () => {
    return (
        <div className="donarlist">
            <h2> Select you Donar Fron Here..!!</h2>
            <div class="list-group">
                <a href="#" class="list">This is a primary list group item</a>
                <a href="#" class="list">This is a secondary list group item</a>
                <a href="#" class="list">This is a success list group item</a>
                <a href="#" class="list">This is a danger list group item</a>
                <a href="#" class="list">This is a warning list group item</a>
                <a href="#" class="list">This is a info list group item</a>
                <a href="#" class="list">This is a light list group item</a>
                <a href="#" class="list">This is a dark list group item</a>
                <img src="donation.svg" className="imagedonar" width="500" height="600" alt="Diseases" />
            </div>
            

            
        </div>
    );
}
 
export default Donar ;



