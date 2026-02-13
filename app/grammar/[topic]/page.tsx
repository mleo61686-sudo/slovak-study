import { notFound } from "next/navigation";

import AlphabetPage from "../alphabet/page";
import VerbsPresentPage from "../verbs-present/page";
import CasesPage from "../cases/page";

export default function GrammarTopicPage({ params }: { params: { topic: string } }) {
  switch (params.topic) {
    case "alphabet":
      return <AlphabetPage />;

    case "verbs-present":
      return <VerbsPresentPage />;

    case "cases":
      return <CasesPage />;

    default:
      return notFound();
  }
}
