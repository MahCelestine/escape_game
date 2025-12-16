import '../App.css'
import Timer from './Timer'
import MoneyCount from './MoneyCount'

function HUD({ items = [] }) {
    return (
        <>
            <div style={{display:"flex",justifyContent:"space-between"}}>
                <Timer />
                <MoneyCount items={items} />
            </div>
        </>
    )
}

export default HUD
