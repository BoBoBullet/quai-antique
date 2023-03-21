import React from 'react'

function Footer()
{
    return(
        <React.Fragment>
            <footer className='bg-dark fixed-bottom footer'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 text-light mt-3'>
                            <p>Nos horaires d'ouverture</p>
                            <ul>
          <li>Lundi - Midi: Fermé - Soir: Fermé</li>
          <li>Mardi - Midi: 12:00 - 14:30 - Soir: 19:00 - 22:00</li>
          <li>Mercredi - Midi: 12:00 - 14:30 - Soir: 19:00 - 22:00</li>
          <li>Jeudi - Midi: 12:00 - 14:30 - Soir: 19:00 - 22:00</li>
          <li>Vendredi - Midi: 12:00 - 14:30 - Soir: 19:00 - 22:00</li>
          <li>Samedi - Midi: 12:00 - 14:30 - Soir: 19:00 - 23:00</li>
          <li>Dimanche - Midi: 12:00 - 15:30 - Soir: 19:00 - 22:30</li>
        </ul>
                        </div>
                    </div>
                </div>

            </footer>
        </React.Fragment>
    )
}
export default Footer;