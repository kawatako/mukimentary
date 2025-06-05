// frontend/components/cheer/CheerTabs.tsx
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CheerManualForm from "./CheerManualForm";
import CheerAiForm from "./CheerAiForm";
import CheerImageAiForm from "./CheerImageAiForm";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState } from "@/lib/types/cheer";
import { useState } from "react";

type Props = {
  cheerTypes: CheerType[];
  muscles: Muscle[];
  poses: Pose[];
  onSubmit: (form: CheerFormState) => void | Promise<void>;
};

export default function CheerTabs({ cheerTypes, muscles, poses, onSubmit }: Props) {
  // グローバルで残り文字から掛け声生成回数のstateを持つ
  const [textAiRemaining, setTextAiRemaining] = useState<number | null>(null);
  // グローバルで残り画像生成回数のstateを持つ
  const [imageAiRemaining, setImageAiRemaining] = useState<number | null>(null);

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
        <CheerAiForm cheerTypes={cheerTypes} muscles={muscles} poses={poses} onSubmit={onSubmit} remaining={textAiRemaining} onChangeRemaining={setTextAiRemaining}/>
      </TabsContent>
      <TabsContent value="image_ai">
        <CheerImageAiForm cheerTypes={cheerTypes} muscles={muscles} poses={poses} onSubmit={onSubmit}  remaining={imageAiRemaining} onChangeRemaining={setImageAiRemaining}/>
      </TabsContent>
    </Tabs>
  );
}
