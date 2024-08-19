import CreatePost from "@/components/cUi/createPost/createPost";
import TrendsSideBar from "@/components/cUi/TrendsSideBar";
import Following from "@/components/dataClient/Following";
import Foryou from "@/components/dataClient/Foryou";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
export default async function Home() {
  return (
    <main className="flex w-full min-w-0 gap-4">
      <div className="w-full min-w-0 space-y-5">
        <CreatePost />
        <Tabs defaultValue="for-you" className="space-y-3">
          <TabsList className="">
            <TabsTrigger value="for-you">
              For you
            </TabsTrigger>
            <TabsTrigger value="following">
              Following
            </TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
              <Foryou />
          </TabsContent>
          <TabsContent value="following">
              <Following />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSideBar />
    </main>
  );
}
