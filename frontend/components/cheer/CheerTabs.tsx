// frontend/components/cheer/CheerTabs.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CheerManualForm from "./CheerManualForm";
import CheerAiForm from "./CheerAiForm";
import CheerImageAiForm from "./CheerImageAiForm";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState } from "@/lib/types/cheer";

type Props = {
  cheerTypes: CheerType[];
  muscles: Muscle[];
  poses: Pose[];
  onSubmit: (form: CheerFormState) => void | Promise<void>;
};

export default function CheerTabs({ cheerTypes, muscles, poses, onSubmit }: Props) {
  return (
    <Tabs defaultValue="manual" className="w-full">
      <TabsList>
        <TabsTrigger value="manual">Manual</TabsTrigger>
        <TabsTrigger value="ai">AI</TabsTrigger>
        <TabsTrigger value="image_ai">画像AI</TabsTrigger>
      </TabsList>
      <TabsContent value="manual">
        <CheerManualForm cheerTypes={cheerTypes} muscles={muscles} poses={poses} onSubmit={onSubmit} />
      </TabsContent>
      <TabsContent value="ai">
        <CheerAiForm cheerTypes={cheerTypes} muscles={muscles} poses={poses} onSubmit={onSubmit} />
      </TabsContent>
      <TabsContent value="image_ai">
        <CheerImageAiForm cheerTypes={cheerTypes} muscles={muscles} poses={poses} onSubmit={onSubmit} />
      </TabsContent>
    </Tabs>
  );
}
