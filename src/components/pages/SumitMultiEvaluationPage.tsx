import { Button, Textarea, TextInput } from "@mantine/core";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useSubmitMultiEvaluationMutation } from "../../graphql/generated/graphql";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { components } from "react-select";
import { useDebounce } from "../../hooks/debounce";

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

  // React-Selectを使用して非同期で対象者候補を取得する
  const [inputText, setInputText] = useState("");
  const [options, setOptions] = useState([]);
  const [page, setPage] = useState(1);
  const debouncedInputText = useDebounce(inputText, 500);
  const addnewOption = () => {
    setPage(page + 1);
  };
  const url = `https://api.github.com/search/users?q=${inputText} in:login&per_page=5&page=${page}`;
  useEffect(() => {
    const getData = async () => {
      const arr: any = [...options];
      await axios.get(url).then((res) => {
        let result = res.data.items;
        result.map((user: { id: any; login: any }) => {
          return arr.push({ value: user.id, label: user.login });
        });
        setOptions(arr);
      });
    };
    if (inputText !== "") {
      getData();
    } else {
      setOptions([]);
    }
  }, [debouncedInputText, page]);

  // 更に表示する場合の
  const SelectMenuButton = (props: any) => {
    return (
      <components.MenuList {...props}>
        {props.children}
        <p
          style={{ cursor: "pointer", color: "#228be6", paddingLeft: "15px" }}
          onClick={() => addnewOption()}
        >
          + 更に表示する
        </p>
      </components.MenuList>
    );
  };

  // セレクトボックスに入力されたテキストの状態更新
  const handleSelectInputChange = (input: string) => {
    setInputText(input);
    setOptions([]);
    setPage(1);
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmitMultiEvaluation)}>
        <Select
          placeholder="名前を入力してください"
          noOptionsMessage={() => "ユーザーはいません"}
          options={options}
          isMulti
          components={{ MenuList: SelectMenuButton }}
          onInputChange={handleSelectInputChange}
        />
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
