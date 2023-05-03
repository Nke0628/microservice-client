import { Loader, Select } from "@mantine/core";
import { MantineSelectBoxData } from "../../interfaces";
import { useFetchTopPageDataQuery } from "../../graphql/generated/graphql";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";

const MultiEvaluationPage: React.FC = () => {
  const [result] = useFetchTopPageDataQuery();

  // ローディング
  if (result.fetching) return <Loader />;

  // エラー
  if (result.error || !result.data) return <p>Error</p>;

  // 正常
  let multiBusinessTermSelectBoxData: MantineSelectBoxData[] = [];
  let currentTermValue: string = "";
  multiBusinessTermSelectBoxData = result.data.multiBusinessTerms.map(
    (multiBusinessTerm) => {
      if (multiBusinessTerm.isCurrentTerm) {
        currentTermValue = multiBusinessTerm.id.toString();
      }
      return {
        value: multiBusinessTerm.id.toString(),
        label: multiBusinessTerm.businessTermName,
      };
    }
  );

  return (
    <div>
      <Select
        label="営業期"
        placeholder="Pick one"
        data={multiBusinessTermSelectBoxData}
        defaultValue={currentTermValue}
        style={{ width: 200 }}
      />
      <div style={{ marginTop: 15 }}>
        <Link to={"/sample"}>
          <Button>新規登録</Button>
        </Link>
      </div>
    </div>
  );
};

export default MultiEvaluationPage;
