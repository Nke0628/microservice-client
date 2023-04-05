import { useQuery } from "@apollo/client";
import { Loader, Select } from "@mantine/core";
import { GET_MULTI_EVALUATION_PAGE } from "../../graphql/query";
import { MantineSelectBoxData, MultiBusinessTermData } from "../../interfaces";

const MultiEvaluationPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_MULTI_EVALUATION_PAGE);

  // ローディング
  if (loading) return <Loader />;

  // エラー
  if (error) return <p>Error</p>;

  // 正常
  let multiBusinessTermSelectBoxData: MantineSelectBoxData[] = [];
  let currentTermValue: string = "";
  multiBusinessTermSelectBoxData = data.multiBusinessTerms.map(
    (multiBusinessTerm: MultiBusinessTermData) => {
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
    </div>
  );
};

export default MultiEvaluationPage;
