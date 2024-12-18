import { useState } from "react"
import { Button } from "./components/Button"
import { Cards } from "./components/Cards"
import { CreateContentModal } from "./components/CreateContentModal"
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
import { Sidebar } from "./components/Sidebar"

function App() {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <div>
      <Sidebar/>
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }}/>
      <div className="flex justify-end gap-4">
      <Button onClick={() => {
        setModalOpen(true);
      }} variant="primary" text="Add Content" startIcon={<PlusIcon/>}/>
      <Button variant="secondary" text="Share Brain" startIcon={<ShareIcon/>}/>
      </div>
      <div className="flex gap-4">
      <Cards title="first tweet" type="twitter"
      link="https://x.com/AllAboutEvents8/status/1868976679697486330"/>
      <Cards title="first video" type="youtube" 
      link="https://www.youtube.com/watch?v=gGHaXVO-9j4&t=9222s&ab_channel=HarkiratSingh"/>
      </div>
      </div>
    </div>
  )
}

export default App
