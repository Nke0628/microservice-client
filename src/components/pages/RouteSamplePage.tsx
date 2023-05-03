import { Button, Textarea, TextInput } from "@mantine/core";
import { useState } from "react";
import { useTestMutation } from "../../graphql/generated/graphql";

const RouteSamplePage: React.FC = () => {
  const [targetUserID, setTargetUserId] = useState<string>("");
  const [score, setScore] = useState<string>();
  const [goodComment, setGoodComment] = useState<string>("");
  const [improvementComment, setImprovementComment] = useState<string>(""); // hooks
  const [insertIntoemployeesCollectionResult, insertIntoemployeesCollection] =
    useTestMutation();
  const handleRegisterMultiEvaluation = () => {
    insertIntoemployeesCollection({
      input: {
        userId: 1,
        targetUserId: 1,
        multiTermId: 1,
        score: Number(score),
        goodComment: goodComment,
        improvementComment: improvementComment,
      },
    });
  };
  return (
    <div>
      <TextInput
        value={targetUserID}
        label="対象者"
        onChange={(e) => {
          setTargetUserId(e.target.value);
        }}
      ></TextInput>
      <TextInput
        value={score}
        label="点数"
        onChange={(e) => {
          setScore(e.target.value);
        }}
      ></TextInput>
      <Textarea
        value={goodComment}
        label="良い点"
        withAsterisk
        onChange={(e) => {
          setGoodComment(e.target.value);
        }}
      ></Textarea>
      <Textarea
        value={improvementComment}
        label="改善点"
        withAsterisk
        onChange={(e) => {
          setImprovementComment(e.target.value);
        }}
      ></Textarea>
      <Button onClick={handleRegisterMultiEvaluation} style={{ marginTop: 15 }}>
        投稿
      </Button>
    </div>
  );
};

export default RouteSamplePage;
