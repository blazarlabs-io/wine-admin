"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Text,
  PageLayout,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Button,
  Input,
  Label,
} from "@/components";
import { tokenizedWineSample } from "@/data/tokenizedWineSample";
import { ChevronsUpDown } from "lucide-react";
import { useWineClient } from "@/context/wineClientSdkContext";
import { useState } from "react";
import { useToast } from "@/components";

export const BackEndPage = () => {
  const { wineClient } = useWineClient();
  const { toast } = useToast();

  const [uid, setUid] = useState<string>("");

  const handleAddSampleWineToWinery = async () => {
    wineClient.winery
      .registerWineryWine({ uid, wine: JSON.parse(tokenizedWineSample) })
      .then((result: any) => {
        toast({
          title: "Success",
          description: "Wine sample added to winery.",
        });
      })
      .catch((error: any) => {
        toast({
          title: "Error",
          description: error.message,
        });
      });
  };
  return (
    <PageLayout>
      <div className="flex items-center justify-start gap-[8px]">
        <Text intent="h4">Backend</Text>
      </div>
      <Text>Add sample wine to winery.</Text>
      <div>
        <div className="flex flex-col items-start justify-start gap-[8px]">
          <Label htmlFor="uid">UID</Label>
          <div className="flex items-center justify-center gap-[12px]">
            <Input
              id="uid"
              placeholder="UID"
              onChange={(e) => setUid(e.target.value)}
            />
            <Button
              variant="ghost"
              className="font-semibold"
              onClick={handleAddSampleWineToWinery}
            >
              Run
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-[900px]">
        <Collapsible>
          <CollapsibleTrigger>
            <div className="flex items-center justify-center gap-[4px] border rounded-lg p-3">
              <span>Tokenized wine sample JSON</span>
              <ChevronsUpDown className="h-4 w-4" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SyntaxHighlighter language="javascript" style={atomDark}>
              {tokenizedWineSample}
            </SyntaxHighlighter>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </PageLayout>
  );
};
