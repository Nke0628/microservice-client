import { Button, Textarea, TextInput } from "@mantine/core";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useSubmitMultiEvaluationMutation } from "../../graphql/generated/graphql";
import { useNavigate } from "react-router-dom";

type SubmitMultiEvaluationFormData = {
  targetUserId: string;
  score: string;
  goodComment: string;
  improvementComment: string;
};

const RouteSamplePage: React.FC = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    targetUserId: Yup.string().required("対象者を選択してください"),
    score: Yup.string().required("査定値を選択してください"),
    goodComment: Yup.string().min(10, "良い点は10文字以上入力してください"),
    improvementComment: Yup.string().min(
      10,
      "改善点は10文字以上入力してください"
    ),
  });

  const form = useForm<SubmitMultiEvaluationFormData>({
    validate: yupResolver(validationSchema),
    initialValues: {
      targetUserId: "",
      score: "",
      goodComment: "",
      improvementComment: "",
    },
  });

  const [, submitMultiEvaluation] = useSubmitMultiEvaluationMutation();
  const handleSubmitMultiEvaluation = (
    formData: SubmitMultiEvaluationFormData
  ) => {
    submitMultiEvaluation({
      input: {
        userId: 1,
        targetUserId: 2,
        multiTermId: 1,
        score: Number(formData.score),
        goodComment: formData.goodComment,
        improvementComment: formData.improvementComment,
      },
    }).then((result) => {
      if (result.error) {
        alert(result.error?.graphQLErrors[0].extensions.errorDetail);
      }
      alert("360度評価を登録しました。");
      navigate("/");
    });
  };

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
export default RouteSamplePage;
