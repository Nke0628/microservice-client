import React from "react";
import { PDFDocument } from "pdf-lib";
import { jsPDF } from "jspdf";

const JsPdfPage: React.FC = () => {
  const generateFirstPDF = () => {
    const doc = new jsPDF();
    doc.text("First PDF content", 10, 10);
    return doc.output("arraybuffer");
  };

  const generateSecondPDF = () => {
    const doc = new jsPDF();
    doc.text("Second PDF content", 10, 10);
    return doc.output("arraybuffer");
  };

  const mergePDFs = async () => {
    try {
      // 新しいPDFドキュメントを作成
      const mergedPdf = await PDFDocument.create();

      // 個別のPDFを生成
      const pdf1 = await PDFDocument.load(generateFirstPDF());
      const pdf2 = await PDFDocument.load(generateSecondPDF());

      // 各PDFのページをコピー
      const pdf1Pages = await mergedPdf.copyPages(pdf1, pdf1.getPageIndices());
      const pdf2Pages = await mergedPdf.copyPages(pdf2, pdf2.getPageIndices());

      // マージPDFに追加
      pdf1Pages.forEach((page) => mergedPdf.addPage(page));
      pdf2Pages.forEach((page) => mergedPdf.addPage(page));

      // マージしたPDFを保存
      const mergedPdfFile = await mergedPdf.save();

      // Blobを作成
      const blob = new Blob([mergedPdfFile], { type: "application/pdf" });

      // ダウンロード用のリンクを作成して自動クリック
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "merged.pdf";
      document.body.appendChild(link);
      link.click();

      // 不要になったリンクとBlobのURLを削除
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("PDFのマージに失敗しました:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={mergePDFs}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        PDFをマージしてダウンロード
      </button>
    </div>
  );
};

export default JsPdfPage;
