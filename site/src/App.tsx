import { useCallback, useState } from "react";
import { Prototype } from "./Prototype";
import { PreloaderTw } from "./components/ui/preloader-tw";

export function App() {
  const [introReady, setIntroReady] = useState(false);
  const handleIntroComplete = useCallback(() => setIntroReady(true), []);

  return (
    <PreloaderTw
      loading={!introReady}
      variant="stairs"
      duration={5200}
      loadingText="carregando a magia..."
      bgColor="#f3f4f1"
      respectReducedMotion
      onComplete={handleIntroComplete}
    >
      <Prototype introReady={introReady} />
    </PreloaderTw>
  );
}
