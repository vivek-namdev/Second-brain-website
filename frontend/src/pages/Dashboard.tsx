import { useState } from "react"
import { Button } from "../components/Button"
import { Cards } from "../components/Cards"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
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
      </div>
      </div>
    </div>
  )
}