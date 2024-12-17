import { Button } from "./components/Button"
import { Cards } from "./components/Cards"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  return (
    <div>
      <Button variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
      <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}/>
      <Cards/>
    </div>
  )
}

export default App
