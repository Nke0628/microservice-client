import { Button, Textarea, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { SubmitMultiEvaluationFormData } from "./SubmitMultiEvaluationContainer copy";

type SubmitMultiEvaluationPresenterProps = {
  form: UseFormReturnType<SubmitMultiEvaluationFormData>;
  handleSubmitMultiEvaluation: (data: SubmitMultiEvaluationFormData) => void;
};

const SubmitMultiEvaluationPresenter: React.FC<
  SubmitMultiEvaluationPresenterProps
> = ({ form, handleSubmitMultiEvaluation }) => {
  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmitMultiEvaluation)}>
        <TextInput
          {...form.getInputProps("targetUserId")}
          label="対象者"
        ></TextInput>
        <TextInput {...form.getInputProps("score")} label="査定値"></TextInput>
        <Textarea
          {...form.getInputProps("goodComment")}
          label="良い点"
          withAsterisk
        ></Textarea>
        <Textarea
          {...form.getInputProps("improvementComment")}
          label="改善点"
          withAsterisk
        ></Textarea>
        <Button type="submit" style={{ marginTop: 15 }}>
          投稿
        </Button>
      </form>
    </div>
  );
};
export default SubmitMultiEvaluationPresenter;
