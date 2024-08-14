import CreatePost from "@/components/cUi/createPost/createPost";
import { DialogueMe } from "@/components/cUi/MoreButton";
import TrendsSideBar from "@/components/cUi/TrendsSideBar";
import Foryou from "@/components/dataClient/Foryou";
export default async function Home() {
  return (
    <main className="w-full flex gap-4">
      <div className="w-full space-y-5">
        <CreatePost />
        <Foryou/>
      </div>
      <TrendsSideBar/>
    </main>
  );
}
