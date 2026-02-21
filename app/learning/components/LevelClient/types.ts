export type Word = {
  sk: string;
  ua: string;
  ru?: string;
  ipa?: string;
  img?: string;
  imgCredit?: string;

  // ✅ для вправи "Збери речення" (необов'язково)
  phrase?: {
    sk: string;
    ua: string;
    ru?: string;
    tokens: string[];
  };
};

export type ExerciseKind =
  | "chooseTranslation"
  | "chooseSlovak"
  | "writeWord"
  | "audioQuiz"
  | "matchColumns"
  | "buildSentence";

export type ExerciseDef = {
  kind: ExerciseKind;
  title: string;
  mode: "perWord" | "whole";
};