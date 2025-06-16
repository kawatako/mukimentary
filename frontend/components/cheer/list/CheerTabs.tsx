// frontend/components/cheer/list/CheerTabs.tsx
"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CheerManualForm from "../forms/CheerManualForm";
import CheerAiForm from "../forms/CheerAiForm";
import CheerImageAiForm from "../forms/CheerImageAiForm";
import type { CheerType, Muscle, Pose } from "@/lib/types/prests";
import type { CheerFormState,Cheer } from "@/lib/types/cheer";
import { useState } from "react";

type Props = {
  cheerTypes: CheerType[];
  muscles: Muscle[];
  poses: Pose[];
  cheerSamples: Cheer[]; 
  onSubmit: (form: CheerFormState) => void | Promise<void>;
};

export default function CheerTabs({
  cheerTypes,
  muscles,
  poses,
  cheerSamples,
  onSubmit,
}: Props) {
  // グローバルで残り文字から掛け声生成回数のstateを持つ
  const [textAiRemaining, setTextAiRemaining] = useState<number | null>(null);
  // グローバルで残り画像生成回数のstateを持つ
  const [imageAiRemaining, setImageAiRemaining] = useState<number | null>(null);

  return (
    <Tabs defaultValue='manual' className='w-full'>
      <TabsList className='w-full max-w-lg mx-auto flex justify-between bg-accent/10 border border-border rounded-xl px-2 py-1 gap-2 shadow-sm'>
        <TabsTrigger
          value='manual'
          className='flex-1 text-center data-[state=active]:bg-card data-[state=active]:text-foreground rounded-lg px-4 py-1 text-sm font-semibold'
        >
          Manual
        </TabsTrigger>
        <TabsTrigger
          value='ai'
          className='flex-1 text-center data-[state=active]:bg-card data-[state=active]:text-foreground rounded-lg px-4 py-1 text-sm font-semibold'
        >
          AI
        </TabsTrigger>
        <TabsTrigger
          value='image_ai'
          className='flex-1 text-center data-[state=active]:bg-card data-[state=active]:text-foreground rounded-lg px-4 py-1 text-sm font-semibold'
        >
          画像AI
        </TabsTrigger>
      </TabsList>

      <TabsContent value='manual'>
        <CheerManualForm
          cheerTypes={cheerTypes}
          muscles={muscles}
          poses={poses}
          onSubmit={onSubmit}
        />
      </TabsContent>
      <TabsContent value='ai'>
        <CheerAiForm
          cheerTypes={cheerTypes}
          muscles={muscles}
          poses={poses}
          onSubmit={onSubmit}
          cheerSamples={cheerSamples}
          remaining={textAiRemaining}
          onChangeRemaining={setTextAiRemaining}
        />
      </TabsContent>
      <TabsContent value='image_ai'>
        <CheerImageAiForm
          cheerTypes={cheerTypes}
          muscles={muscles}
          poses={poses}
          onSubmit={onSubmit}
          cheerSamples={cheerSamples}
          remaining={imageAiRemaining}
          onChangeRemaining={setImageAiRemaining}
        />
      </TabsContent>
    </Tabs>
  );
}
