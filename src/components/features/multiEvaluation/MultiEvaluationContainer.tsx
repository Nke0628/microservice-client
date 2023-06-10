import {
  useFetchMultiEvaluationsQuery,
  useFetchMultiTermsQuery,
} from "../../../graphql/generated/graphql";
import { useState } from "react";
import MultiEvaluationPresenter from "./MultiEvaluationPresenter";

const MultiEvaluationContainer: React.FC = () => {
  //　評価期間取得、現在の評価期間設定
  const [FetchMultiTermsResult] = useFetchMultiTermsQuery();
  const { multiTerms } = FetchMultiTermsResult.data!;
  const [multiTermId, setMultiTermId] = useState<string>(
    multiTerms.find((multiTerm) => multiTerm.isCurrentTerm)!.id
  );

  // 自身が評価したデータ取得
  const [result] = useFetchMultiEvaluationsQuery({
    variables: {
      termId: Number(multiTermId),
    },
  });
  const { myEvaluatingMultiEvaluations } = result.data!;

  return (
    <MultiEvaluationPresenter
      multiTerms={multiTerms}
      multiTermId={multiTermId}
      setMultiTermId={setMultiTermId}
      evaluatingEvalations={myEvaluatingMultiEvaluations}
    ></MultiEvaluationPresenter>
  );
};

export default MultiEvaluationContainer;
