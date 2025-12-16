import '../App.css'
import Timer from './Timer'
import MoneyCount from './MoneyCount'

function HUD({items = []}) {
    return (
        <>
            <Timer />
            <MoneyCount items={items} />
        </>
    )
}

export default HUD
