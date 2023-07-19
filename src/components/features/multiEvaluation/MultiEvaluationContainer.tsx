import {
  FetchMultiEvaluationsQuery,
  useFetchMultiEvaluationsQuery,
  useFetchMultiTermsQuery,
} from "../../../graphql/generated/graphql";
import { useEffect, useState } from "react";
import MultiEvaluationPresenter from "./MultiEvaluationPresenter";
import { ReportSubmitStatus, SearchCondition } from "./type";

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

  // 検索条件
  const [searchCondition, setSearchCondition] = useState<SearchCondition>({
    reportSubmitStatus: [],
  });

  // 検索条件 - レポート提出状況更新
  const handleChangeReportSubmitStatus = (status: ReportSubmitStatus) => {
    setSearchCondition({
      ...searchCondition,
      reportSubmitStatus: !searchCondition.reportSubmitStatus.includes(status)
        ? [...searchCondition.reportSubmitStatus, status]
        : searchCondition.reportSubmitStatus.filter(
            (current) => current !== status
          ),
    });
  };

  // 検索条件 - フィルター後リスト
  const [filteredEvaluation, setFilteredEvaluation] = useState<
    FetchMultiEvaluationsQuery["myEvaluatingMultiEvaluations"]
  >(myEvaluatingMultiEvaluations);

  // 検索条件 - フィルター処理
  const filterBySearchCondition = () => {
    // レポート提出状況
    let filteredEvaluation = myEvaluatingMultiEvaluations;
    if (searchCondition.reportSubmitStatus.length) {
      filteredEvaluation = myEvaluatingMultiEvaluations.filter((evaluation) =>
        searchCondition.reportSubmitStatus.includes(Number(evaluation.id))
      );
    }
    return filteredEvaluation;
  };

  useEffect(() => {
    setFilteredEvaluation(filterBySearchCondition());
  }, [searchCondition]);

  return (
    <MultiEvaluationPresenter
      multiTerms={multiTerms}
      multiTermId={multiTermId}
      setMultiTermId={setMultiTermId}
      evaluatingEvalations={filteredEvaluation}
      searchCondition={searchCondition}
      handleChangeReportSubmitStatus={handleChangeReportSubmitStatus}
    ></MultiEvaluationPresenter>
  );
};

export default MultiEvaluationContainer;
